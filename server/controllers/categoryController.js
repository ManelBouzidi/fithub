const db =require('../orm/indexorm.js');


//get all categories
const getAllCategories = async(req,res)=>{
    try {
        const result =await db.category.findAll({})
        res.status(200).send(result);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};


//add new category (admin only)
const addCategory =async(req,res)=>{
    const {name}=req.body;
    try {
        const newCategory=await db.category.create({name})
        res.status(200).send({category:newCategory,message:'new category added:))'})
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports ={getAllCategories,addCategory};