const School = require("../models/School.model");
const Student = require("../models/student.model");
const Teacher = require("../models/Teacher.model");
const SchoolAdmin = require("../models/schoolAdmin.model");
const crypto = require("crypto");
const { log } = require("console");

// ================= CREATE SCHOOL =================
async function createSchool(req, res) {
  try {
    const { name, email } = req.body;

    console.log(req.body);
    

    // 🔐 Validation
    if (!name || !email) {
      return res.status(400).json({
        message: "School name and email are required"
      });
    }

    // 🔍 Check if school already exists
    const exist = await School.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "School already exists"
      });
    }

    // 🔥 Generate unique schoolCode (example: SCH-A1B2C3)
    const schoolCode =
      "SCH-" + crypto.randomBytes(3).toString("hex").toUpperCase();

    // 🏫 Create School
    const school = await School.create({
      name,
      email,
      schoolCode
    });

    // 📤 Response
    res.status(201).json({
      message: "School created successfully",
      school: {
        id: school._id,
        name: school.name,
        email: school.email,
        schoolCode: school.schoolCode
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= DELETE SCHOOL =================
async function deleteSchool(req, res) {
  try {
    console.log("wroking");
    
    const { email } = req.body;
    console.log(email);
    

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // 🔍 Find school by email
    const school = await School.findOne({ email });

    if (!school) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    // 🔥 CASCADE DELETE
    await Student.deleteMany({ schoolId: school._id });
    await Teacher.deleteMany({ schoolId: school._id });
    await SchoolAdmin.deleteMany({ schoolId: school._id });

    // 🗑 DELETE SCHOOL
    await School.findOneAndDelete({ email });

    return res.json({
      message: "School and all related data deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// ================= GET ALL SCHOOLS =================
async function getAllSchools(req, res) {
  try {
    // 🔍 Fetch all schools (latest first)
    const schools = await School.find()
      .select("name schoolCode email")
      .sort({ createdAt: -1 });

    res.json({
      total: schools.length,
      schools
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// 📦 Export all functions
module.exports = {
  createSchool,
  deleteSchool,
  getAllSchools
};