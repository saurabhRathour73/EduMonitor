const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");

async function parentLogin(req, res) {
  try {
    const { studentName,enrollmentNumber } = req.body;

    // 🔐 Validation
    if (!studentName || !enrollmentNumber) {
      return res.status(400).json({
        message: "Student name and enrollment number are required"
      });
    }

    // 🔍 Find student
    const student = await Student.findOne({
      fullName: studentName.trim().toLowerCase(),
      enrollmentNumber
    });

    if (!student) {
      return res.status(404).json({
        message: "Invalid student name or enrollment number"
      });
    }

    // 🚫 Active check
    if (student.isActive === false) {
      return res.status(403).json({
        message: "Student account is deactivated"
      });
    }

    // 🔥 Parent token
    const token = jwt.sign(
      {
        id: student._id,
        role: "parent",
        schoolId: student.schoolId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // 🍪 Cookie
    res.cookie("parentToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Parent login successful",
      student: {
        id: student._id,
        fullName: student.fullName,
        enrollmentNumber: student.enrollmentNumber,
        class: student.class,
        section: student.section,
        rollNumber: student.rollNumber
      }
    });

  } catch (error) {
    console.log("PARENT LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {parentLogin};