const router=require("express").Router();
const {getAllCategories,addCategory}=require('../controllers/categoryController.js');

router.get("/getAll",getAllCategories);
router.post("/add",addCategory);


module.exports=router;