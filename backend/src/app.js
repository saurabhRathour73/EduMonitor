const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// routes require
const SuperAdminAuthRouter = require("./routes/SuperAdminAuthroute.route");
const school = require("./routes/shcool.route")
const schoolAdminRouter = require("./routes/schoolAdmin.route")
const studentRouter = require("./routes/student.routes")
const studentSelf = require("./routes/student.auth.routes");
const teacherSelf = require("./routes/teacher.auth.routes");
const teacher = require("./routes/teacher.route")
const parentRoute = require("./routes/parents.route")




const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
// ✅ CORS CONFIG (MOST IMPORTANT)
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8081","https://edu-monitor-iq99.vercel.app","https://edu-monitor-orcin.vercel.app"],
    credentials: true,
  })
);


app.use("/auth/superAdmin", SuperAdminAuthRouter);
app.use("/api/school", school);
app.use("/school/admin", schoolAdminRouter);
app.use("/student/api", studentRouter);
app.use("/student/profile", studentSelf)
app.use("/teacher/api", teacherSelf)

app.use("/admin/teacher", teacher)
app.use('/parent/student',parentRoute)




module.exports = app;