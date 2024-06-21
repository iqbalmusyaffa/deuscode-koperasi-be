import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token not found'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if (decoded.role_id !== 1) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid role'
      })
    }

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
