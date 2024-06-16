import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'starbs.business@gmail.com',
    pass: 'bnfx wngr tlcj moky '
  }
})

export default transporter
