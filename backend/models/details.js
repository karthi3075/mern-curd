const mongoose=require("mongoose");
const detailSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:Number,required:true,min:1111111111,max:9999999999},
    email:{type:String,required:true,match:[/^\S+@\S+\.\S+$/,"please enter valid email"]}
})
module.exports=mongoose.model("Detail",detailSchema);