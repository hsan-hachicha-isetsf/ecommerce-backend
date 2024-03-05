const express=require("express")
const categorie = require("../models/categorie")
const router=express.Router()

router.post("/",async(req,res)=>{


    try {
        const cat1=new categorie({nomcategorie:req.body.nomcategorie,imagecategorie:req.body.imagecategorie})
        await cat1.save()
        res.status(200).json(cat1)
    } catch (error) {
        res.status(404).json({message:error.message})
    }


})

router.get("/",async(req,res)=>{

try {
    const cat=await categorie.find()
    res.status(200).json(cat)
} catch (error) {
    res.status(404).json({message:error.message})
}

})
router.get("/:id",async(req,res)=>{
try {
    const cat=await categorie.findById(req.params.id)
    res.status(200).json(cat)
} catch (error) {
    res.status(404).json({message:error.message}) 
}
})

router.delete("/:id",async(req,res)=>{
 try {
    await categorie.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"suppression effectuée avec succées"})
 } catch (error) {
    res.status(404).json({message:error.message})
 }

})
router.put("/:id",async(req,res)=>{
  try {
    const cat=await categorie.findByIdAndUpdate(
        {
           "_id":req.params.id     
        },
        {
            $set:req.body,
        },
        { new: true },
        )
    res.status(200).json(cat)
  } catch (error) {
    res.status(404).json({message:error.message})
  }

})
module.exports=router