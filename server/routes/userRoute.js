const router = require("express").Router();
const {getAllUsers, getOneUser, signup, login, deleteUser, updateUser} = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/getAll", authMiddleware, getAllUsers);
router.get("/getOne/:id", authMiddleware, getOneUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
