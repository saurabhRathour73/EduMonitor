const mongoose = require("mongoose");

async function connectToDB(){
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db");
        
    }
    catch(err){
        console.log("Errer connecting to mongoDB :")
    }

}


module.exports=connectToDB;