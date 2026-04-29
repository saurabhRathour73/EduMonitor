const express = require("express");
const superAdminMiddleware = require("../middlewares/authMiddleware")

//controller


const {
    createSchool,
    deleteSchool,
    getAllSchools
 } = require("../controller/schoolController.controller")


const router = express.Router();




router.post("/createSchool", superAdminMiddleware, createSchool);

// get all schools
router.get("/all", superAdminMiddleware, getAllSchools);

// delete school
router.delete("/delete/:id", superAdminMiddleware, deleteSchool);

module.exports = router;