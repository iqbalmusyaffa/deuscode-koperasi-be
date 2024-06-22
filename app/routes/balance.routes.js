import express from 'express'
import loggerMiddleware from '../middleware/logger.middleware'
import balanceController from '../controllers/balance.controller'

const router = express.Router()

router.use(loggerMiddleware)

router.get('/:userId', balanceController.getBalance)

export default router
