// models/SuperAdmin.js
const mongoose = require("mongoose")

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String
    },
    role: {
        type: String,
        default: "superadmin"
    }
}, { timestamps: true });

const SuperAdmin= mongoose.model("SuperAdmin", superAdminSchema);

module.exports=SuperAdmin;