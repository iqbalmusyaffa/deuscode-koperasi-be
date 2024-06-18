import express from 'express';
import * as productController from '../controllers/ProductController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
