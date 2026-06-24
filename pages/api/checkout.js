import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const preference = {
      items: [
        {
          title: 'PromptPeel - 1000+ Prompts Premium',
          unit_price: 20000,
          quantity: 1,
          currency_id: 'COP',
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`,
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ url: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
}
