import { ProfileService } from '../services/profile.service'
import upload from '../utils/upload'

export const ProfileController = {
  async getById(req, res) {
    const { nik } = req.params

    if (!nik) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request parameter incomplete'
      })
    }

    try {
      const profile = await ProfileService.findUnique(nik)

      if (!profile) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile not found'
        })
      }

      return res.status(200).json({
        error: null,
        message: 'Request successful',
        data: profile
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Profile.controller.js: getById - ' + error
      })
    }
  },

  async updateNik(req, res) {
    const { nik, new_nik } = req.body

    if (!nik || !new_nik) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.updateProfile(nik, new_nik)
      return res.status(200).json({
        error: null,
        message: 'Profile updated successfully',
        data: profile
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Profile.controller.js: updateNik - ' + error.message
      })
    }
  },

  async updateName(req, res) {
    const { name, new_name } = req.body

    if (!name || !new_name) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.updateProfile(name, new_name)
      return res.status(200).json({
        error: null,
        message: 'Profile updated successfully',
        data: profile
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Profile.controller.js: updateName - ' + error.message
      })
    }
  },

  async updateAddress(req, res) {
    const { address, new_address } = req.body

    if (!address || !new_address) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.updateProfile(address, new_address)
      return res.status(200).json({
        error: null,
        message: 'Profile updated successfully',
        data: profile
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'Error in Profile.controller.js: updateAddress - ' + error.message
      })
    }
  },

  async updateBirthdate(req, res) {
    const { birth_date, new_birth_date } = req.body

    if (!birth_date || !new_birth_date) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.updateProfile(
        birth_date,
        new_birth_date
      )
      return res.status(200).json({
        error: null,
        message: 'Profile updated successfully',
        data: profile
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'Error in Profile.controller.js: updateBirthdate - ' + error.message
      })
    }
  },

  // Update profile image by uploading a new image, then updating the profile image URL in the database, and deleting the old image, if any exists
  async updateProfileImage(req, res) {
    const { nik } = req.body

    if (!nik) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.findUnique(nik)

      if (!profile) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile not found'
        })
      }

      const oldImage = profile.profile_image
      const newImage = await upload(req)

      if (newImage.error) {
        return res.status(500).json({
          message:
            'Error in Profile.controller.js: updateProfileImage - ' +
            newImage.error
        })
      }

      const updatedProfile = await ProfileService.updateProfile(
        nik,
        newImage.url
      )

      if (oldImage) {
        await Upload.deleteImage(oldImage)
      }

      return res.status(200).json({
        error: null,
        message: 'Profile image updated successfully',
        data: updatedProfile
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'Error in Profile.controller.js: updateProfileImage - ' +
          error.message
      })
    }
  },

  async deleteProfileImage(req, res) {
    const { nik } = req.body

    if (!nik) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body incomplete'
      })
    }

    try {
      const profile = await ProfileService.findUnique(nik)

      if (!profile) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile not found'
        })
      }

      const oldImage = profile.profile_image

      if (!oldImage) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Profile image not found'
        })
      }

      await ProfileService.updateProfile(nik, null)
      await Upload.deleteImage(oldImage)

      return res.status(200).json({
        error: null,
        message: 'Profile image deleted successfully'
      })
    } catch (error) {
      return res.status(500).json({
        message:
          'Error in Profile.controller.js: deleteProfileImage - ' +
          error.message
      })
    }
  }
}
