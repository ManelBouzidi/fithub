const router=require("express").Router();
const {getAllOrders,createOrder}=require('../controllers/ordersController.js');

router.get("/getAll",getAllOrders);
router.post("/add",createOrder);


module.exports=router;