import bcrypt from 'bcrypt'

const saltRounds = 10

const Bcrypt = {
  async encryptPassword(password) {
    return await bcrypt.hash(password, saltRounds)
  },

  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash)
  }
}

export default Bcrypt
