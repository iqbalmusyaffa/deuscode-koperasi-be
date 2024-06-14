import express from 'express'
import loggerMiddleware from '../middleware/logger.middleware.js'
import authMiddleware from '../middleware/auth.middleware.js'
import AuthController from '../controllers/Auth.controller.js'

const router = express.Router()

// Menggunakan logger middleware di semua routes
router.use(loggerMiddleware)

// Rute untuk mendaftar pengguna baru
router.post('/register', AuthController.register)

// Rute untuk masuk (login) pengguna
router.post('/login', AuthController.login)

// Rute untuk refresh token
router.post('/refresh-token', AuthController.refreshToken)

// Rute untuk check authorization
router.get('/check-authorization', authMiddleware, AuthController.checkAuth)

export default router
