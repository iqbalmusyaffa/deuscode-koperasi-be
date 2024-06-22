import { ProductService } from '../services/product.service.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

class ProductController {
  static upload = upload;

  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products', message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      if (error.message === 'Invalid ID provided' || error.message === 'Product not found') {
        res.status(404).json({ error: 'Product not found', message: error.message });
      } else {
        res.status(500).json({ error: 'Failed to fetch product', message: error.message });
      }
    }
  }

  static async create(req, res) {
    try {
      const { seller_id, name, description, price, stock } = req.body;
      const image = req.file ? req.file.path : null;

      const product = await ProductService.create({
        seller_id,
        name,
        description,
        price,
        stock,
        image,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product', message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid ID provided. Please provide a positive integer ID." });
      }

      // Mengambil data dari form-data
      const { name, description, price, stock } = req.body;
      const image = req.file ? req.file.path : undefined; // Mengambil path file jika ada file yang di-upload

      const updatedProduct = await ProductService.update(id, { name, description, price, stock, image });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ProductService.delete(req.params.id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      if (error.message === 'Invalid ID provided' || error.message === 'Product not found') {
        res.status(404).json({ error: 'Product not found', message: error.message });
      } else {
        res.status(500).json({ error: 'Failed to delete product', message: error.message });
      }
    }
  }
}

export default ProductController;
