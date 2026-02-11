import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_ID;

app.post('/send-whatsapp', async (req, res) => {
  const { phone, message, imageUrl } = req.body;

  if (!token || !phoneNumberId) {
    return res.status(500).json({ error: 'Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID in server environment' });
  }

  if (!phone || !message) {
    return res.status(400).json({ error: 'phone and message are required' });
  }

  try {
    const payload = {
      messaging_product: 'whatsapp',
      to: phone,
      type: imageUrl ? 'image' : 'text',
      ...(imageUrl ? { image: { link: imageUrl, caption: message } } : { text: { body: message } })
    };

    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(response.ok ? 200 : 500).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
});

app.listen(PORT, () => {
  console.log(`WhatsApp API proxy listening on http://localhost:${PORT}`);
});
