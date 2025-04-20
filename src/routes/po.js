const express = require("express");
const router = express.Router();
const pStars = require("../models/pstar");
const protect = require("../middleware/auth");


router.get("/", (req, res)=>{
    res.send("Welcome from the creator of this Absurd API");
})


//Actual stuff
router.post("/females", protect, async(req, res)=>{
   try{
    let insert;
    if(Array.isArray(req.body)){
        insert = await pStars.insertMany(req.body);
    }else{
        const singleEntry = new pStars(req.body);
        insert = await singleEntry.save();
    }
    res.status(201).json({
        success : true,
        data : insert
    })
   }catch(error){
    res.status(400).send(error)
   }
})

router.get("/females", async(req, res)=>{
    try{
        const fem = await pStars.find().sort({popularity: -1});
        res.status(200).send(fem);
    }catch(error){
        res.status(500).send(error)
    }
})

router.get("/females/:id", async (req, res)=>{
    try{
        const _id = req.params.id;
        const fem = await pStars.findById(_id);
        res.status(200).send(fem);
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch("/females/:id", protect, async(req, res)=>{
    try{
        const _id = req.params.id;
        const fem = await pStars.findByIdAndUpdate(_id, req.body, { 
            new : true
        });
        res.status(200).send(fem)
    }catch(error){
        res.status(500).send(error);
        console.log(error)
    }
})

router.delete("/females/:id", protect, async (req, res)=>{
    try{
        const _id = req.params.id;
        const insert = await pStars.findByIdAndDelete(_id);
        res.send(insert);
    }catch(error){
        res.status(500).send(error);
        console.log(error)
    }
})

router.delete("/females", protect, async(req, res)=>{
    try{
        const insert = await pStars.deleteMany({})
        res.status(200).send(insert)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
})


module.exports = router;