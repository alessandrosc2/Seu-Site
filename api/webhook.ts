import { MercadoPagoConfig, Payment } from 'mercadopago';
import * as crypto from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // P0.2: Validar Assinatura do Mercado Pago
  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  const webhookSecret = process.env.MP_WEBHOOK_SECRET;

  if (signature && requestId && webhookSecret) {
    const parts = signature.split(',');
    const tsPart = parts.find((p: string) => p.trim().startsWith('ts='));
    const v1Part = parts.find((p: string) => p.trim().startsWith('v1='));
    
    if (tsPart && v1Part) {
      const ts = tsPart.split('=')[1];
      const v1 = v1Part.split('=')[1];
      const dataId = req.body?.data?.id || req.query['data.id'];
      
      const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
      const hash = crypto.createHmac('sha256', webhookSecret).update(manifest).digest('hex');
      
      if (hash !== v1) {
        console.error("Assinatura do webhook inválida!");
        return res.status(401).json({ message: 'Unauthorized webhook' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid signature format' });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // Exigimos assinatura em produção
    return res.status(401).json({ message: 'Missing signature headers or secret' });
  }

  const { action, data, type } = req.body;
  const id = data?.id || req.query['data.id'];
  const topic = type || req.query.topic;

  if (topic === 'payment' || action === 'payment.created' || action === 'payment.updated') {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ message: 'Missing MP_ACCESS_TOKEN' });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const paymentClient = new Payment(client);

    try {
      const payment = await paymentClient.get({ id });
      
      if (payment.status === 'approved') {
        const email = payment.metadata?.buyer_email || payment.payer?.email;
        
        if (email) {
          // P0.3: Remover valor de fallback
          const FIREBASE_API_KEY = process.env.VITE_FIREBASE_API_KEY;
          const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID;
          
          if (!FIREBASE_API_KEY || !FIREBASE_PROJECT_ID) {
            console.error("Firebase config is missing in environment variables.");
            return res.status(500).json({ error: 'Missing Firebase Configuration' });
          }

          // Verificar Idempotência no Firestore usando REST API
          // Vamos tentar criar o documento com currentDocument.exists = false
          // Se falhar (409 Conflict), já foi processado.
          const orderDocUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/orders/${id}?key=${FIREBASE_API_KEY}`;
          
          const createOrderRes = await fetch(orderDocUrl + '&currentDocument.exists=false', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: {
                payment_id: { stringValue: id.toString() },
                email: { stringValue: email },
                amount: { doubleValue: payment.transaction_amount || 0 },
                status: { stringValue: 'approved' },
                createdAt: { timestampValue: new Date().toISOString() }
              }
            })
          });

          if (createOrderRes.status === 409) {
            console.log(`Order ${id} já processada. Ignorando.`);
            return res.status(200).json({ success: true, message: 'Idempotent - already processed' });
          }

          if (!createOrderRes.ok) {
            console.error('Falha ao salvar order no Firestore:', await createOrderRes.text());
            // Continua assim mesmo para liberar o acesso, mas loga o erro
          }

          // 1. Cria o usuário no Firebase com uma senha aleatória
          const randomPassword = Math.random().toString(36).slice(-10) + "A1!";
          
          const signUpRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              password: randomPassword,
              returnSecureToken: true
            })
          });
          
          const signUpData = await signUpRes.json();
          const userId = signUpData.localId;
          const idToken = signUpData.idToken;

          // Se a conta não foi recém-criada, ela pode já existir
          let finalIdToken = idToken;
          let finalUserId = userId;
          
          if (signUpData.error && signUpData.error.message === 'EMAIL_EXISTS') {
            console.log("Usuário já existe. Continuaremos com a liberação de senha.");
          }

          // 2. Envia o email de "Redefinição de Senha" do próprio Firebase
          await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requestType: 'PASSWORD_RESET',
              email: email
            })
          });
          console.log(`✅ Acesso liberado e email enviado para: ${email}`);
        }
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(200).json({ success: true, message: 'Event ignored' });
}
