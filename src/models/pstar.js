const mongoose = require("mongoose");


const pornstar = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    category:{
        type: [String],
        required: true
    },
    popularity:{
        type: Number,
        required: true
    },
    videoCount:{
        type: Number,
        required: true
    }
})

const Pstar = new mongoose.model("Pstar", pornstar);

module.exports = Pstar;