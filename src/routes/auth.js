const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register
router.post("/register", async(req, res)=>{
    try{
        const {username, password} = req.body;
        if(await User.findOne({username})){
            return res.status(400).json({message: "user already exists"});
        }
        const user = await User.create({username, password});
        res.status(201).json({message: "user registered"})
    }catch(e){
        res.status(500).json({error: e.message})
        console.log(e);
    }
})

// Login 

router.post("/login", async(req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user || !(await user.matchPassword(password))){
            res.status(401).json({message: "invalid cred"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "1h"
        })
        res.json({token})

    }catch(e){
        res.status(500).json({error: e.message});
        console.log(e);
    }
})

module.exports = router;

