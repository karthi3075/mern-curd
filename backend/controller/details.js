const Detail=require("../models/details")

exports.create_details=async(req,res)=>{
    try{
        const {name,mobile,email}=req.body
         const data=new Detail({
            name:name,
            mobile:mobile,
            email:email
        })
        await data.save();
        res.json({status:true})
    }catch(error){
        console.log("error to create:",error);
        res.json({status:false});
    }
}

exports.get_details=async(req,res)=>{
    try{
        const response=await Detail.find();
        res.json(response)
    }catch(error){
        console.log("error:",error);
        console.log("failed")
        res.json({message:"failed to get"});
    }
}

exports.delete_details=async(req,res)=>{
    try{
        const id=req.params.id
        const response=await Detail.deleteOne({_id:id})
        if(response){
            res.json({status:true})
        }else{
            res.json({status:false})
        }
    }catch(error){
        console.log("error from delete",error)
    }
}

exports.edit_details=async(req,res)=>{
    try{
        const {id,name,mobile,email}=req.body
        if(name!="" && mobile!="" && email!=""){
            const response=await Detail.updateOne({_id:id},{$set:{name:name,mobile:mobile,email:email}})
            if(response){
                res.json({status:true})
            }else{
                res.json({status:false})
            }
        }else{
            res.json({status:false})
        }
    }catch(error){
        console.log("error from edit",error)
    }
}

exports.search_details=async(req,res)=>{
    try{
        const {name}=req.query
        const response=await Detail.find({name:{$regex:`^${name}`,$options:"i"}})
        res.json(response)
    }catch(error){
        console.log("error from search",error);
        res.json({message:"failed to search"});
    }
}