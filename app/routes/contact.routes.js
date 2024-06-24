import express from 'express'
import ContactController from '../controllers/contact.controller.js'

const router = express.Router()

router.post('/contacts', ContactController.createContact)
router.get('/contacts', ContactController.getAllContacts)
router.get('/contacts/:id', ContactController.getContactById)
router.put('/contacts/:id', ContactController.updateContact)
router.delete('/contacts/:id', ContactController.deleteContact)

export default router
