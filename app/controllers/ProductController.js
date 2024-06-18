import * as productService from '../services/product.service.js';

export const createProduct = async (req, res) => {
  try {
    const { seller_id, name, description, price, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await productService.createProduct({
      seller_id: parseInt(seller_id, 10),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image: imagePath,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    if (imagePath) {
      updatedData.image = imagePath;
    }

    const product = await productService.updateProduct(id, updatedData);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
