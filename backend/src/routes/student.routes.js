const express = require("express");
const router = express.Router();

const {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents
} = require("../controller/student.controller");

const teacherAuth = require("../middlewares/teacherAuth");

// 🔐 only teacher can manage students
router.post("/create", teacherAuth, createStudent);
router.put("/update/:id", teacherAuth, updateStudent);
router.delete("/delete/:id", teacherAuth, deleteStudent);
router.get("/getAllstudent", teacherAuth, getAllStudents);

module.exports = router;