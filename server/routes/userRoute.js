const router=require("express").Router();
const {getAllUsers,getOneUser,addUser,deleteUser,updateUser}=require('../controllers/userController.js');

router.get("/getAll",getAllUsers);
router.get("/getOne/:id",getOneUser);
router.post("/add",addUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);

module.exports=router;