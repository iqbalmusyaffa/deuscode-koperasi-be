import express from 'express'
import transactionHistoryController from '../controllers/TransactionHistory.controller.js'
import loggerMiddleware from '../middleware/logger.middleware.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(loggerMiddleware)

router.get(
  '/',
  authMiddleware,
  transactionHistoryController.getAllTransactionHistory
)
router.get('/:userId', transactionHistoryController.getTransactionHistory)

export default router
