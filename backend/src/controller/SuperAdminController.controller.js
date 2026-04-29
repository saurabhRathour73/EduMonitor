const teacherModel = require("../models/SuperAdmin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // ✅ added

// ================= REGISTER =================
async function registerController(req, res) {
  try {
    
    const { name, email, password } = req.body;

    const isUserExist = await teacherModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await teacherModel.create({
      name,
      email,
      password: hashpassword,
      role: "superadmin",
      isVerified: false
    });

    // 🔐 verification token
    const verifyToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    const verifyLink = `http://localhost:3000/auth/superAdmin/verify-email/${verifyToken}`;

    // ✅ EMAIL SEND (MAIN STEP)
    await sendEmail(email, verifyLink);

    // ✅ login token (same as before)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("register token", token);


    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // 🔥 MUST CHANGE
    });

    res.status(201).json({
      message: "Registered successfully. Please check your email to verify.",
      user: {
        email: user.email,
        fullName: user.fullName
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

// ================= LOGIN =================
async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await teacherModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔐 verify check
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("login token", token);


    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // 🔥 MUST CHANGE
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ================= LOGOUT =================

async function logoutController(req, res) {
  try {

    console.log("mai working hu");
    
    // 🧹 Clear JWT cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // same as login/register
      expires: new Date(0), // 🔥 instantly expire cookie
    });

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
}

// ================= VERIFY EMAIL =================
async function verifyEmailController(req, res) {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await teacherModel.findById(decoded.id);

    const baseStyle = `
      body {
        margin:0;
        font-family: 'Segoe UI', sans-serif;
        background: #f9fafb;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
      }

      .card {
        background: white;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        text-align: center;
        max-width: 420px;
        width: 90%;
      }

      .btn {
        display:inline-block;
        padding:12px 24px;
        background: #ff6b2c;
        color: white;
        text-decoration: none;
        border-radius: 30px;
        font-weight: 600;
        margin-top: 20px;
      }

      .logo {
        font-size: 22px;
        font-weight: bold;
        color: #ff6b2c;
        margin-bottom: 20px;
      }
    `;

    if (!user) {
      return res.send(`
        <html>
        <style>${baseStyle}</style>
        <body>
          <div class="card">
            <div class="logo">EduMentor.</div>
            <h1 style="color:#ff4d4f;">❌ Invalid User</h1>
            <p>Something went wrong. Please try again.</p>
          </div>
        </body>
        </html>
      `);
    }

    if (user.isVerified) {
      return res.send(`
        <html>
        <style>${baseStyle}</style>
        <body>
          <div class="card">
            <div class="logo">EduMentor.</div>
            <h1 style="color:#ff6b2c;">ℹ️ Already Verified</h1>
            <p>Your email is already verified.</p>
            <a href="http://localhost:5173/login" class="btn">
              Go to Login
            </a>
          </div>
        </body>
        </html>
      `);
    }

    user.isVerified = true;
    await user.save();

    // ✅ SUCCESS UI (Edvara Style)
    return res.send(`
      <html>
      <style>${baseStyle}</style>
      <body>
        <div class="card">
          
          <div class="logo">EduMentor.</div>

          <h1 style="color:#22c55e;">✅ Email Verified</h1>

          <p style="color:#555;">
            Your account has been successfully verified.<br/>
            Welcome to smarter learning 🚀
          </p>

          <a href="http://localhost:3000/auth/superAdmin/login" class="btn">
            Go to Login
          </a>

        </div>
      </body>
      </html>
    `);

  } catch (err) {
    return res.send(`
      <html>
      <style>
        body {
          margin:0;
          font-family: 'Segoe UI', sans-serif;
          background:#f9fafb;
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
        }
      </style>
      <body>
        <div style="text-align:center;">
          <h1 style="color:#ff4d4f;">⛔ Invalid or Expired Link</h1>
          <p>Please try registering again.</p>
        </div>
      </body>
      </html>
    `);
  }
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyEmailController
};