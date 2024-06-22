// routes/index.js
import express from 'express'
import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'
import balanceRoutes from './balance.routes.js'
import transactionHistoryRoutes from './transactionHistory.routes.js'
import pinjamanRoutes from './pinjaman.routes.js'
import loanStatusRoutes from './loanStatus.routes.js'  
import savingsBalanceRoutes from './savingsBalance.routes.js'
import goldDepositRoutes from './goldDeposit.routes.js'
import fundTransferRoutes from './fundTransfer.routes.js'


const router = express.Router()

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/balance', balanceRoutes)
router.use('/transaction-history', transactionHistoryRoutes)
router.use('/pinjaman', pinjamanRoutes)
router.use('/statuspinjaman', loanStatusRoutes)
router.use('/savings-balance', savingsBalanceRoutes)
router.use('/gold-deposit', goldDepositRoutes)
router.use('/fund-transfer', fundTransferRoutes)

export default router
