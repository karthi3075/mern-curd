const mongoose=require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    }catch(error){  
        console.log("error from db:",error)
    }
}   
module.exports=connectDB;
