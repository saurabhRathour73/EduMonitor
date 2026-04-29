const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= STUDENT LOGIN =================
async function loginStudent(req, res) {
  try {
    const { enrollmentNumber, pin } = req.body;


    if (!enrollmentNumber || !pin) {
      return res.status(400).json({
        message: "Enrollment number and pin are required"
      });
    }

    const student = await Student.findOne({ enrollmentNumber });

    if (!student) {
      return res.status(400).json({
        message: "Invalid enrollment number or pin"
      });
    }

    // 🔥 FIX: fallback check
    console.log(student.toObject().password);

    if (!student.toObject().password) {
      return res.status(500).json({
        message: "Student credentials not configured properly"
      });
    }

    const isMatch = await bcrypt.compare(pin, student.toObject().password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid enrollment number or pin"
      });
    }

    if (!student.isActive) {
      return res.status(403).json({
        message: "Account is deactivated"
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: student.role || "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    return res.status(200).json({
      message: "Student login successful",
      student: {
        id: student._id,
        fullName: student.fullName,
        enrollmentNumber: student.enrollmentNumber,
        class: student.class,
        section: student.section
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  loginStudent
};