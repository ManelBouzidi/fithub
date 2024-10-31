const router=require("express").Router();
const {getAllProducts,getOneProduct,addProduct,deleteProduct,updateProduct}=require('../controllers/productController.js');

router.get("/getAll",getAllProducts);
router.get("/getOne/:id",getOneProduct);
router.post("/add",addProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);
router.get('/:name', getProductByName);

module.exports=router;