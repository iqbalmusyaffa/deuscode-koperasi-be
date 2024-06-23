import { getComplains, createComplain } from '../services/complaint.service.js'

class ComplaintController {
  async createComplain(req, res) {
    try {
      const data = req.body
      const result = await createComplain(data)

      return res.status(201).json({
        error: null,
        message: 'Complain created successfully',
        data: result
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'error in Complaint.controller.js: createComplain - ' + error.message
      })
    }
  }

  async getComplains(req, res) {
    try {
      const result = await getComplains()
      return res.status(200).json({
        error: null,
        message: 'Complains retrieved successfully',
        data: result
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'error in Complaint.controller.js: getComplains - ' + error.message
      })
    }
  }
}

export default ComplaintController
