
import express from 'express';
import Product from '../models/product.js';

const productsRouter = express.Router();

productsRouter.post('/', async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  if (!title || !price) return res.status(400).json({ error: 'Title and price are required' });

  try {
    const product = new Product({ title, description, price, imageUrl });
    await product.save();
    // const product = { title, description, price, imageUrl };
    res.status(201).json({ status: 'success', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Users fetch all products
productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // const products = [
    //   {
    //     id: "1",
    //     title: "Sample Product 1",
    //     description: "This is a sample product.",
    //     price: 29.99,
    //     imageUrl: "https://picsum.photos/200/300"
    //   },
    //   {
    //     id: "2",
    //     title: "Sample Product 2",
    //     description: "Another sample product.",
    //     price: 39.99,
    //     imageUrl: "https://picsum.photos/200/300"
    //   },
    //   {
    //     id: "3",
    //     title: "Sample Product 3",
    //     description: "Yet another sample product.",
    //     price: 49.99,
    //     imageUrl: "https://picsum.photos/200/300"
    //   }
    // ];
   
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default productsRouter;  
