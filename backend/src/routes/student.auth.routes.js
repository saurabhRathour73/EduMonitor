const express = require("express");
const router = express.Router();

const { loginStudent } = require("../controller/student.auth.controller");

// 🔓 public route
router.post("/login", loginStudent);

module.exports = router;