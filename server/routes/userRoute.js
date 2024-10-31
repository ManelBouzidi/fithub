const router = require("express").Router();
const {getAllUsers, getOneUser, signup, login, deleteUser, updateUser} = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware=require('../middleware/adminMiddleware.js')
// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/getAll", authMiddleware, getAllUsers);
router.get("/getOne/:id", authMiddleware, getOneUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get('/admin/dashbord',authMiddleware,adminMiddleware,(req,res)=>{
    res.json({message:'Welcome Admin'})
})

module.exports = router;
