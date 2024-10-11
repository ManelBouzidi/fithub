const db =require('../orm/indexorm.js');


//getting all orders (admin only)
const getAllOrders = async(req,res)=>{
    try {
        const result =await db.orders.findAll({})
        res.status(200).send(result);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};


//user want to order
const createOrder =async(req,res)=>{
    const {userId,price,products}=req.body;
    try {
        const newOrder=await db.orders.create({userId,price,products})
        res.status(200).send({orders:newOrder,message:'new order done :))'})
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports ={getAllOrders,createOrder};