import express from 'express'
import loggerMiddleware from '../middleware/logger.middleware.js'
import balanceController from '../controllers/Balance.controller.js'

const router = express.Router()

router.use(loggerMiddleware)

router.get('/:userId', balanceController.getBalance)

export default router
