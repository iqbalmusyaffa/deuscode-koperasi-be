// routes/index.js
import express from 'express'
import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'
import balanceRoutes from './balance.routes.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/balance', balanceRoutes)

export default router
