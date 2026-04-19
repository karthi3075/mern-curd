const express=require("express");
const app=express();
const PORT=process.env.PORT;
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
app.listen(PORT,"0.0.0.0",()=>{
    console.log("server started")
})
