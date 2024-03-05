const express=require("express")
const router=express.Router()
const article=require("../models/article")
router.post("/",async(req,res)=>{

    try {
        const newart=new article(req.body)
        await newart.save()
        res.status(200).json(newart)
    } catch (error) {
        res.status(404).json({message:error.message})
    }

})

// afficher la liste des articles.
router.get('/', async (req, res, )=> {
    try {
        const articles = await article.find({}, null, {sort: {'_id': -1}}).populate("scategorieID").exec();
                
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

// afficher la liste des articles par page
// afficher la liste des articles par page 

router.get('/art/pagination', async(req, res) => { 
    const page = req.query.page ||1 
    
    // Current page 
    const limit = req.query.limit ||5; 
    // Number of items per page // Calculez le nombre d'éléments à sauter (offset) 
    const offset = (page - 1) * limit; 
    try { 
    // Effectuez la requête à votre source de données en utilisant les paramètres de pagination 
    
    const articlesTot = await article.countDocuments(); 
    const articles = await article.find() 
    .skip(offset) 
    .limit(limit) 
    res.status(200).json({articles:articles,tot:articlesTot}); } 
    catch (error) { 
        res.status(404).json({ message: error.message });
     } });

module.exports=router