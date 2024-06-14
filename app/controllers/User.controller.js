import bcrypt from "bcrypt";
import User from "../../models/User.js";

const UserController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      return res.json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to get users",
        error: error.message,
      });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.user.email,
        },
        attributes: ["name", "email"],
      });
      return res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to get user profile",
        error: error.message,
      });
    }
  },

  async updateUser(req, res) {
    const { name, email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      user.name = name;

      await user.save();

      return res.json({
        success: true,
        message: "User updated successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    }
  },

  async updatePassword(req, res) {
    const { email, oldPassword, newPassword } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const compare = await bcrypt.compare(oldPassword, user.password);
      if (!compare) {
        return res
          .status(401)
          .json({ success: false, message: "Old password is incorrect" });
      }

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = newHashedPassword;
      await user.save();

      return res.json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to update password",
        error: error.message,
      });
    }
  },
};

export default UserController;
