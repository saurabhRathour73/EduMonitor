const express = require("express");
const router = express.Router();

const {
  loginTeacher,
  logoutTeacher
} = require("../controller/teacher.auth.controller");

// 🔓 public login
router.post("/login", loginTeacher);

// 🔐 logout
router.post("/logout", logoutTeacher);

module.exports = router;