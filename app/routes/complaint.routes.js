import express from 'express'
import complaintController from '../controllers/Complaint.controller.js'
import loggerMiddleware from '../middleware/logger.middleware.js'

const router = express.Router()

router.use(loggerMiddleware)

router.post('/complain', complaintController.createComplain)
router.get('/complains', complaintController.getComplains)

export default router
