const express = require("express");

const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");


const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
