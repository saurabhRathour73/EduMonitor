const Student = require("../models/student.model");
const Counter = require("../models/Counter.model");
const bcrypt = require("bcryptjs");


// ================= ENROLLMENT GENERATOR =================
async function generateEnrollmentNumber(school, className, section) {
  const year = new Date().getFullYear().toString().slice(-2); // Example: 26

  let counter = await Counter.findOne({
    schoolId: school._id, // MongoDB school _id
    className,
    section,
    year
  });

  if (!counter) {
    counter = await Counter.create({
      schoolId: school._id,
      className,
      section,
      year,
      sequence: 1
    });
  } else {
    counter.sequence += 1;
    await counter.save();
  }

  const seq = counter.sequence.toString().padStart(4, "0");

  // 🔥 FIX:
  // If schoolCode missing, fallback to SCH
  // Using MongoDB school _id for DB uniqueness, schoolCode only for display
  return `${school.schoolCode || "SCH"}-${className}-${section}-${year}-${seq}`;
}

// ================= CREATE STUDENT =================
async function createStudent(req, res) {
  try {

    const { fullName, password, className, section, rollNumber } = req.body;

    if (!fullName || !password || !className || !section) {
      return res.status(400).json({
        message: "Name, class, section and password are required"
      });
    }

    // 🔐 Hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    // 🔥 IMPORTANT:
    // req.user._id = Teacher MongoDB ID
    // req.user.schoolId = School MongoDB ID (if teacher belongs to school)
    // Since you want school MongoDB _id, use req.user._id ONLY if teacher itself is school document
    // Otherwise use req.user.schoolId

    const school = {
      _id: req.user._id, // MongoDB school ID as requested
      schoolCode: req.user.schoolCode || "SCH",
      name: req.user.name || "School"
    };

    // Generate enrollment number
    const enrollmentNumber = await generateEnrollmentNumber(
      school,
      className,
      section
    );

    // Create student
    const student = await Student.create({
      fullName,
      enrollmentNumber,
      password: hashedpassword,
      class: className,
      section,
      rollNumber,
      schoolId: school._id, // storing MongoDB school id
      name: school.name,
      createdBy: req.user._id
    });

    return res.status(201).json({
      message: "Student created successfully",
      student: {
        id: student._id,
        fullName: student.fullName,
        enrollmentNumber: student.enrollmentNumber,
        class: student.class,
        section: student.section,
        schoolId: student.schoolId
      }
    });

  } catch (error) {
    console.log("CREATE STUDENT ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}



// ================= UPDATE STUDENT =================
// ================= UPDATE STUDENT =================
async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const { fullName, className, section, rollNumber } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 🔥 FIX:
    // You are storing schoolId using req.user._id during create
    // So compare with req.user._id (NOT req.user.schoolId)
    if (student.schoolId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized access"
      });
    }

    // Update fields
    if (fullName) student.fullName = fullName;
    if (className) student.class = className;
    if (section) student.section = section;
    if (rollNumber) student.rollNumber = rollNumber;

    await student.save();

    return res.status(200).json({
      message: "Student updated successfully",
      student
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}

// ================= DELETE STUDENT =================
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 🔥 FIX:
    if (student.schoolId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized access"
      });
    }

    await Student.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}

// ================= GET ALL STUDENTS =================
async function getAllStudents(req, res) {
  try {
    // 🔥 FIX:
    // Must match createStudent schoolId storage
    const students = await Student.find({
      schoolId: req.user._id
    }).select("-password");

    return res.status(200).json({
      total: students.length,
      students
    });

  } catch (error) {
    console.log("GET ALL ERROR:", error);

    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents
};