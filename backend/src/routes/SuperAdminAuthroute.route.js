const express = require("express");
const superAdminMiddleware = require("../middlewares/authMiddleware")

//controller
const {
    registerController,
    loginController,
    logoutController,
    verifyEmailController
} = require("../controller/SuperAdminController.controller");


const {createSchool, deleteSchool,getAllSchools} = require("../controller/schoolController.controller")


const router = express.Router();

router.post("/register", registerController);
router.post("/login",loginController);
router.post("/logout", logoutController);
router.get("/verify-email/:token", verifyEmailController);


router.post("/createSchool",superAdminMiddleware , createSchool);
router.delete("/deleteSchool", superAdminMiddleware, deleteSchool);
router.get("/getSchools", getAllSchools);


module.exports = router;