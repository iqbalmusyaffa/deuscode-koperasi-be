// routes/index.js
import express from 'express'
import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'
import balanceRoutes from './balance.routes.js'
import transactionHistoryRoutes from './transactionHistory.routes.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/balance', balanceRoutes)
router.use('/transaction-history', transactionHistoryRoutes)

export default router
