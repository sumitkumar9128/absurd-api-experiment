const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userAuth = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

userAuth.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userAuth.methods.matchPassword = function(plain){
    return bcrypt.compare(plain, this.password);
}

module.exports = mongoose.model("User", userAuth);

