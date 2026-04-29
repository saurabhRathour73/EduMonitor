const SchoolAdmin = require("../models/schoolAdmin.model");
const School = require("../models/School.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
async function registerSchoolAdmin(req, res) {
  try {
    const { fullName, email, password, schoolCode } = req.body;

    // 🔐 check school exists
    const school = await School.findOne({ schoolCode });

    if (!school) {
      return res.status(400).json({
        message: "Invalid School Code"
      });
    }

    // 🔐 check admin already exists
    const exist = await SchoolAdmin.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const admin = await SchoolAdmin.create({
      fullName,
      email,
      password: hashpassword,
      schoolId: school._id,
      name: school.name,
      schoolCode: school.schoolCode
    });

    res.status(201).json({
      message: "School Admin registered successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= LOGIN =================
async function loginSchoolAdmin(req, res) {
  try {
    console.log("school admin");
    
    const { email, password } = req.body;

    const admin = await SchoolAdmin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        message: "Account is deactivated"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        schoolId: admin.schoolId
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= LOGOUT =================
async function logoutSchoolAdmin(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= DELETE ADMIN =================
async function deleteSchoolAdmin(req, res) {
  try {
    const { id } = req.params;

    const admin = await SchoolAdmin.findById(id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    await SchoolAdmin.findByIdAndDelete(id);

    res.json({
      message: "School Admin deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= GET ADMIN =================


async function getSchoolAdmin(req, res) {
  try {
    const admin = await SchoolAdmin.findById(req.user.id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    res.json({
      admin
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  registerSchoolAdmin,
  loginSchoolAdmin,
  logoutSchoolAdmin,
  deleteSchoolAdmin,
  getSchoolAdmin
};