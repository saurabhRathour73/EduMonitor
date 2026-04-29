const jwt = require("jsonwebtoken");
const SchoolAdmin = require("../models/schoolAdmin.model");

async function schoolAdminAuth(req, res, next) {
  try {
    // 🔥 token get from cookie
    const token = req.cookies.token;

    

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token"
      });
    }
    

    // 🔐 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    
    // 🔥 check role
    if (decoded.role !== "schoolAdmin") {
      return res.status(403).json({
        message: "Access denied - Not a School Admin"
      });
    }

    
    // 🔥 find admin from DB
    const admin = await SchoolAdmin.findById(decoded.id).select("-password");
    

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found"
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        message: "Account is deactivated"
      });
    }

    // 🔥 attach user to request
    req.user = admin;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = schoolAdminAuth;