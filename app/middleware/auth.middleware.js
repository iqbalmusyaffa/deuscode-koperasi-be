import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token not found'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    })
  }
}

export default authMiddleware
