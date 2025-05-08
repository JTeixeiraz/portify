import axios from 'axios';
import { db } from '../firebase.js';

export async function createPixPayment(req, res) {
  const { userId, email } = req.body;

  try {
    const response = await axios.post(
      'https://api.mercadopago.com/instore/orders/qr/seller/collectors/default',
      {
        title: "Acesso Portify Vitalício",
        description: "Compra única",
        notification_url: "https://SEU_DOMINIO/api/webhook",
        external_reference: userId,
        total_amount: 5,
        items: [
          {
            title: "Portify Acesso",
            unit_price: 5,
            quantity: 1,
          },
        ],
        payment_methods: {
          pix: {}
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      }
    );

    return res.json({ qrCodeBase64: response.data.qr_data, userId });

  } catch (error) {
    console.error("Erro ao criar pagamento Pix:", error.response?.data || error);
    return res.status(500).json({ message: "Erro ao gerar pagamento" });
  }
}

export async function handleWebhook(req, res) {
  const { body } = req;

  try {
    if (body.data && body.type === 'payment') {
      const paymentId = body.data.id;

      const paymentInfo = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      });

      const { status, external_reference } = paymentInfo.data;

      if (status === "approved") {
        await db.collection('users').doc(external_reference).update({
          status: "paid"
        });
        console.log(`Pagamento confirmado para usuário ${external_reference}`);
      }
    }

    res.sendStatus(200);

  } catch (error) {
    console.error("Erro no webhook:", error.response?.data || error);
    res.sendStatus(500);
  }
}
