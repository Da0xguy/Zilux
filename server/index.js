import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing.js";


dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  "/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  }),
);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

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
    // const product = new Product({ title, description, price, imageUrl });
    // await product.save();
    const product = { title, description, price, imageUrl };
    res.status(201).json({ status: 'success', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Users fetch all products
app.get('/products', async (req, res) => {
  try {
    // const products = await Product.find().sort({ createdAt: -1 });
    const products = [
      {
        id: "1",
        title: "Sample Product 1",
        description: "This is a sample product.",
        price: 29.99,
        imageUrl: "https://picsum.photos/200/300"
      },
      {
        id: "2",
        title: "Sample Product 2",
        description: "Another sample product.",
        price: 39.99,
        imageUrl: "https://picsum.photos/200/300"
      },
      {
        id: "3",
        title: "Sample Product 3",
        description: "Yet another sample product.",
        price: 49.99,
        imageUrl: "https://picsum.photos/200/300"
      }
    ];
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.use((req, res) => {
  console.warn(`Unhandled route: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Zilux backend running on http://localhost:${PORT}`));