const db =require('../orm/indexorm.js');


//getting all Products
const getAllProducts = async(req,res)=>{
    try {
        const result =await db.product.findAll({})
        res.status(200).send(result);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};

//getting just one product by id
const getOneProduct = async(req,res)=>{
    try {
        const id=req.params.id;
        const result=await db.product.findOne({where:{id}})
        if(result.length ===0){
            res.status(404).send({"Message":`Product with id ${id} not found!!`})
        }else res.status(200).send(result)
    } catch (error) {
        console.error('Error finding Product',error);
        res.status(500).send({error:'Errorrr'})
    }
}

//add new product
const addProduct =async(req,res)=>{
    try {
        const body=req.body;
        const result =await db.product.create(body)
        res.status(201).send({Products:result,message:'product added :))'})
    } catch (error) {
        res.status(500).send(error)
    }
};



//delete product
const deleteProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const delProduct =await db.product.destroy({where:{id}})
        res.status(200).send({message:'product deleted!!'})
        
    } catch (error) {
        res.status(500).send(error)
    }
};

//updating Product
const updateProduct=async(req,res)=>{
    try {
        const{name,description,price,images}=req.body;
        const id =req.params.id;
        const updProduct =await db.product.update(
            {
                name:name,description:description,price:price,images:images
            }, {where:{id}}
        )
        const updateProduct =await db.product.findOne({where:{id}})
        res.status(201).send({Product:updateProduct,message:'Product updated'})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports ={getAllProducts,getOneProduct,addProduct,deleteProduct,updateProduct}