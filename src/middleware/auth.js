const jwt = require("jsonwebtoken");

module.exports = function protect( req, res, next){
    const header = req.header("Authorization");

    if(!header){
        return res.status(401).json({message: " No token"})
    }
    const token = header.split(" ")[1];
    try{
        console.log("Secret is:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch{
        res.status(401).json({message: " Invalid Token"})
    }
}