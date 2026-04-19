const express=require("express");
const app=express();
const PORT=5000;
const detailRoutes=require("./routes/details")
const connectDB=require("./config/db")
const cors=require("cors")
require("dotenv").config()
connectDB();
app.use(cors({
    origin:process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(express.urlencoded())
app.use("/details",detailRoutes)
app.use("/",(req,res)=>{
    console.log("server works well")
})
app.listen(PORT,()=>{
    console.log("server started")
})