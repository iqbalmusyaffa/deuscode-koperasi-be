import express from 'express'
import ProfileController from '../controllers/Profile.controller.js'
import loggerMiddleware from '../middleware/logger.middleware.js'

const router = express.Router()

router.use(loggerMiddleware)

router.get('/get/:nik', ProfileController.getById)
router.post('/update/nik', ProfileController.updateNik)
router.post('/update/name', ProfileController.updateName)
router.post('/update/address', ProfileController.updateAddress)
router.post('/update/avatar', ProfileController.updateProfileImage)
