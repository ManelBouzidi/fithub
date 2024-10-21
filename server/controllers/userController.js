const db =require('../orm/indexorm.js');


//getting all users
const getAllUsers = async(req,res)=>{
    try {
        const result =await db.user.findAll({})
        res.status(200).send(result);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};

//getting just one user by id
const getOneUser = async(req,res)=>{
    try {
        const id=req.params.id;
        const result=await db.user.findOne({where:{id}})
        if(result.length ===0){
            res.status(404).send({"Message":`User with id ${id} not found!!`})
        }else res.status(200).send(result)
    } catch (error) {
        console.error('Error finding user',error);
        res.status(500).send({error:'Errorrr'})
    }
}

//add new user
const addUser =async(req,res)=>{
    try {
        const body=req.body;
        const result =await db.user.create(body)
        res.status(201).send({User:result,message:'user added :))'})
    } catch (error) {
        res.status(500).send(error)
    }
};



//delete user
const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const dUser =await db.user.destroy({where:{id}})
        res.status(200).send({message:'User deleted!!'})
        
    } catch (error) {
        res.status(500).send(error)
    }
};

//updating user
const updateUser=async(req,res)=>{
    try {
        const{username,email,password}=req.body;
        const id =req.params.id;
        const updUser =await db.user.update(
            {
                username:username,email:email,password:password
            }, {where:{id}}
        )
        const updateUser =await db.user.findOne({where:{id}})
        res.status(201).send({user:updateUser,message:'User updated'})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports ={getAllUsers,getOneUser,addUser,deleteUser,updateUser}