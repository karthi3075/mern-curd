const express=require("express")
const router=express.Router()
const data=require("../controller/details")

router.get("/get",data.get_details)
router.post("/create",data.create_details)
router.delete("/delete/:id",data.delete_details)    
router.put("/edit",data.edit_details)
router.get("/search",data.search_details)

module.exports=router;