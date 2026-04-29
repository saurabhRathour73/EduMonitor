const express = require("express");
const router = express.Router();

const {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachers
} = require("../controller/teacher.controller");

const schoolAdminAuth = require("../middlewares/schoolAdminAuth");

// 🔥 only school admin allowed
router.post("/create", schoolAdminAuth, createTeacher);
router.put("/update/:id", schoolAdminAuth, updateTeacher);
router.delete("/delete/:id", schoolAdminAuth, deleteTeacher);
router.get("/getTeacher", schoolAdminAuth, getAllTeachers);

module.exports = router;