import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  incrementProductViews,
} from '../controllers/productController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(upload.single('imageFile'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(upload.single('imageFile'), updateProduct)
  .delete(deleteProduct);

router.route('/:id/view').put(incrementProductViews);

export default router;
