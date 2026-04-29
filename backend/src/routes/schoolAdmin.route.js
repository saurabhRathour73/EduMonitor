const express = require("express");
const router = express.Router();
const schoolAdminAuth = require("../middlewares/schoolAdminAuth")

const {
    registerSchoolAdmin,
    loginSchoolAdmin,
    logoutSchoolAdmin,
    deleteSchoolAdmin,
    getSchoolAdmin
} = require("../controller/schoolAdminController.controller");

router.post("/register", registerSchoolAdmin);
router.post("/login", loginSchoolAdmin);
router.post("/logout", logoutSchoolAdmin);
router.delete("/delete/:id", deleteSchoolAdmin);
router.get("/getadmin", schoolAdminAuth, getSchoolAdmin);

module.exports = router;