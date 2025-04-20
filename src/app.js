const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./db/conn");
const authRoute = require("./routes/auth")
const femaleszRoute = require("./routes/po")


const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", authRoute);
app.use("/", femaleszRoute)



app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
})