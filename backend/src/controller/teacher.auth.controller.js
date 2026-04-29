const Teacher = require("../models/Teacher.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= TEACHER LOGIN =================
async function loginTeacher(req, res) {
  try {
    const { email, password } = req.body;
    

    // 🔐 validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 🔍 find teacher
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 🔐 check password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 🔒 check active
    if (!teacher.isActive) {
      return res.status(403).json({
        message: "Account is deactivated"
      });
    }

    // 🔥 JWT TOKEN
    const token = jwt.sign(
      {
        id: teacher._id,
        role: teacher.role,
        schoolId: teacher.schoolId,
        name: teacher.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Teacher login successful",
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

// ================= LOGOUT =================
function logoutTeacher(req, res) {
  res.clearCookie("token");

  res.json({
    message: "Logged out successfully"
  });
}

module.exports = {
  loginTeacher,
  logoutTeacher
};