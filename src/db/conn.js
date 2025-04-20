const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_STRIN).then(()=>{
    console.log("connected to db succesful");
}).catch((error)=>{
    console.log(" failed to connect db", error);
})