const teacherModel = require("../models/Teacher.model");
const jwt = require("jsonwebtoken");

async function teacherAuth(req, res, next) {
  try {
    // get token from cookies
    const token = req.cookies?.token;


    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user in DB
    const user = await teacherModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 🔐 FIXED ROLE CHECK (teacher only)
    if (decoded.role !== "teacher") {
      return res.status(403).json({
        message: "Access denied (Teacher only)"
      });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = teacherAuth;