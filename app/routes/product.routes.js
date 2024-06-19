// app/routes/product.routes.js

import express from 'express';
import ProductController from '../controllers/Product.contoller.js';


const router = express.Router();

// Use middleware for all routes in this router
// router.use(authMiddleware, loggerMiddleware);

// Define routes
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/create', ProductController.upload.single('image'), ProductController.create);
router.put('/update:id', ProductController.upload.single('image'), ProductController.update);
router.delete('/delete:id', ProductController.delete);

export default router;
