import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Use the access token from environment variables
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(500).json({ message: 'Mercado Pago token not configured.' });
  }

  const client = new MercadoPagoConfig({ accessToken });
  const preference = new Preference(client);

  const { email, name, planKey, orderBumps } = req.body;
  
  const PLANS = {
    completo: { title: 'Plano Completo', price: 47.90 },
  };

  if (!planKey || !(planKey in PLANS)) {
    return res.status(400).json({ message: 'Invalid or missing planKey' });
  }

  const selectedPlan = PLANS[planKey as keyof typeof PLANS];
  
  // Prepare additional items if order bumps are selected
  const items = [
    {
      id: `seu-site-unico-${planKey}`,
      title: selectedPlan.title,
      quantity: 1,
      unit_price: selectedPlan.price,
      currency_id: 'BRL',
    }
  ];

  if (orderBumps) {
    if (orderBumps.traffic) {
      items.push({
        id: 'bump-traffic',
        title: 'Guia de Tráfego: Primeiros Clientes',
        quantity: 1,
        unit_price: 9.90,
        currency_id: 'BRL',
      });
    }
    if (orderBumps.sales) {
      items.push({
        id: 'bump-sales',
        title: 'Roteiro de Vendas por WhatsApp',
        quantity: 1,
        unit_price: 9.90,
        currency_id: 'BRL',
      });
    }
  }

  try {
    const response = await preference.create({
      body: {
        items: items,
        payer: {
          email: email,
          name: name
        },
        payment_methods: {
          excluded_payment_types: [
            { id: 'ticket' } // Remove opções de Boleto
          ],
          installments: 12
        },
        metadata: {
          buyer_email: email // Guardamos o email digitado no site para enviar o acesso
        },
        back_urls: {
          success: 'https://seusite-unico.vercel.app/success',
          failure: 'https://seusite-unico.vercel.app/',
          pending: 'https://seusite-unico.vercel.app/'
        },
        auto_return: 'approved',
        notification_url: 'https://seusite-unico.vercel.app/api/webhook'
      }
    });

    res.status(200).json({ id: response.id, init_point: response.init_point });
  } catch (error) {
    console.error('MP Preference Error:', error);
    res.status(500).json({ message: 'Error creating preference' });
  }
}
