const teacherModel = require("../models/SuperAdmin.model");
const jwt = require("jsonwebtoken");

async function authSuperAdmin(req, res, next) {
  try {
    // safer way
    const token = req.cookies?.token;
    

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await teacherModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 🔐 role check (important for super admin)
    if (decoded.role !== "superadmin") {
      return res.status(403).json({
        message: "Access denied (Super Admin only)"
      });
    }

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authSuperAdmin;