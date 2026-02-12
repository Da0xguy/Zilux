import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing.js";
import productsRouter from './controllers/products.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathname = path.join(__dirname, '..', 'dist')
console.log("PAthnme", pathname)
app.use(express.static(pathname))
app.use(cors({ origin: true }))
app.use(express.json());
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  }),
);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));


// --- Routes ---
app.use('/api/products', productsRouter);


app.use((req, res) => {
  console.warn(`Unhandled route: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Zilux backend running on http://localhost:${PORT}`));