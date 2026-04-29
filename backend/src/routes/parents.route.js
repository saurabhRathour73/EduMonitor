const express = require("express");
const router = express.Router();

const {parentLogin} = require("../controller/parentsController.controller");

// ================= PARENT LOGIN =================
// Parent uses student full name + enrollment number
router.post("/login",parentLogin);

module.exports = router;