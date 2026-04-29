const Teacher = require("../models/Teacher.model");
const bcrypt = require("bcryptjs");

// ================= CREATE TEACHER =================
async function createTeacher(req, res) {
  try {
    
    const { fullName, email, password, subject, className, phone } = req.body;

    // 🔐 validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // 🔍 check existing teacher
    const exist = await Teacher.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "Teacher already exists"
      });
    }

    // 🔐 hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    // 🔥 create teacher (auto attach school)
    const teacher = await Teacher.create({
      fullName,
      email,
      password: hashedpassword,
      subject,
      class: className,
      phone,
      schoolId: req.user.schoolId,   // 🔥 important
      name: req.user.name
    });

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: {
        id: teacher._id,
        fullName: teacher.fullName,
        email: teacher.email,
        subject: teacher.subject
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= UPDATE TEACHER =================
async function updateTeacher(req, res) {
  try {
    const { id } = req.params;
    const { fullName, subject, className, phone } = req.body;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    // 🔐 SAFE SCHOOL CHECK (FIXED)
    if (
      !teacher.schoolId ||
      !req.user?.schoolId ||
      teacher.schoolId.toString() !== req.user.schoolId.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    // 🔄 update fields safely
    if (fullName) teacher.fullName = fullName;
    if (subject) teacher.subject = subject;

    // ⚠️ FIXED FIELD NAME (className)
    if (className) teacher.className = className;

    if (phone) teacher.phone = phone;

    await teacher.save();

    return res.json({
      message: "Teacher updated successfully",
      teacher,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// ================= DELETE TEACHER =================
async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    // 🔐 SAFE SCHOOL CHECK (FIXED)
    if (
      !teacher.schoolId ||
      !req.user?.schoolId ||
      teacher.schoolId.toString() !== req.user.schoolId.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    await Teacher.findByIdAndDelete(id);

    return res.json({
      message: "Teacher deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// ================= GET ALL TEACHERS =================
async function getAllTeachers(req, res) {
  try {
    const teachers = await Teacher.find({
      schoolId: req.user.schoolId   // 🔥 important filter
    }).select("-password");

    res.json({
      total: teachers.length,
      teachers
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachers
};