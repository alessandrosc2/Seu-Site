import { MercadoPagoConfig, Payment } from 'mercadopago';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { action, data, type } = req.body;
  const id = data?.id || req.query['data.id'];
  const topic = type || req.query.topic;

  // Processamos apenas eventos de pagamento
  if (topic === 'payment' || action === 'payment.created' || action === 'payment.updated') {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ message: 'Missing MP_ACCESS_TOKEN' });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const paymentClient = new Payment(client);

    try {
      // Busca os detalhes do pagamento no Mercado Pago
      const payment = await paymentClient.get({ id });
      
      // Se o pagamento for aprovado
      if (payment.status === 'approved') {
        // Pega o email que salvamos nos metadados ou do pagador
        const email = payment.metadata?.buyer_email || payment.payer?.email;
        
        if (email) {
          const FIREBASE_API_KEY = process.env.VITE_FIREBASE_API_KEY || "AIzaSyCB1o0ELSMY00I5qdquHT1i1UTWZOQOLAg";
          
          if (!FIREBASE_API_KEY) {
            console.error("VITE_FIREBASE_API_KEY is missing, cannot create user.");
            return res.status(500).json({ error: 'Missing Firebase API Key' });
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

          // Se a conta for criada com sucesso (ou já existir)
          if (signUpRes.ok || (signUpData.error && signUpData.error.message === 'EMAIL_EXISTS')) {
            // 2. Envia o email de "Redefinição de Senha" do próprio Firebase
            // Assim o usuário recebe o link no email dele para cadastrar a senha e acessar o produto
            await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: email
              })
            });
            console.log(`✅ Acesso liberado e email de senha enviado para: ${email}`);
          } else {
            console.error("❌ Erro ao criar usuário no Firebase:", signUpData);
          }
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
