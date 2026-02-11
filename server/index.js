import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// --- Product Schema ---
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// --- Routes ---

// Admin uploads product
app.post('/products', async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  if (!title || !price) return res.status(400).json({ error: 'Title and price are required' });

  try {
    const product = new Product({ title, description, price, imageUrl });
    await product.save();
    res.status(201).json({ status: 'success', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Users fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Zilux backend running on http://localhost:${PORT}`));