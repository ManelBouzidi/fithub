const db = require('../orm/indexorm.js');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');

cloudinary.config({
  cloud_name: 'dqjkaqycr',
  api_key: '752356833528756',
  api_secret: 'eNnONf3pCuzS2EFDlnHpTr7AO0s'
});

// Getting all Products
const getAllProducts = async(req,res) => {
    try {
        const result = await db.product.findAll({
            include: [{
                model: db.category,
                as: 'category'
            }]
        });
        res.status(200).send(result);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};

// Getting just one product by id
const getOneProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const result = await db.product.findOne({
            where: {id},
            include: [{
                model: db.category,
                as: 'category'
            }]
        });
        if(!result){
            res.status(404).send({"Message":`Product with id ${id} not found!!`})
        } else {
            res.status(200).send(result)
        }
    } catch (error) {
        console.error('Error finding Product',error);
        res.status(500).send({error:'Internal Server Error'})
    }
}

// Add new product
const addProduct = async(req,res) => {
    try {
        const { name, description, price, images, categoryId } = req.body;
        let productData = { name, description, price, categoryId };

        if (images) {
            try {
                const result = await cloudinary.uploader.upload(images);
                productData.images = result.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                return res.status(500).send({ message: 'Error uploading image', error: error.message });
            }
        }
        const result = await db.product.create(productData);
        const productWithCategory = await db.product.findOne({
            where: { id: result.id },
            include: [{
                model: db.category,
                as: 'category'
            }]
        });
        res.status(201).send({Product: productWithCategory, message: 'Product added successfully'})
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send({ message: 'Error adding product', error: error.message })
    }
};

// Delete product
const deleteProduct = async(req,res) => {
    try {
        const id = req.params.id;
        const delProduct = await db.product.destroy({where:{id}})
        res.status(200).send({message:'Product deleted successfully'})
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ message: 'Error deleting product', error: error.message })
    }
};

// Updating Product
const updateProduct = async(req,res) => {
    try {
        const { name, description, price, images, categoryId } = req.body;
        const id = req.params.id;
        let updateData = { name, description, price, categoryId };

        if (images) {
            try {
                const result = await cloudinary.uploader.upload(images);
                updateData.images = result.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                return res.status(500).send({ message: 'Error uploading image', error: error.message });
            }
        }

        await db.product.update(updateData, { where: {id} });
        const updatedProduct = await db.product.findOne({
            where: {id},
            include: [{
                model: db.category,
                as: 'category'
            }]
        });
        res.status(200).send({Product: updatedProduct, message: 'Product updated successfully'})
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({ message: 'Error updating product', error: error.message })
    }
}

// Search products
const searchProducts = async (req, res) => {
    const { term } = req.query;
    try {
        const products = await db.product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${term}%` } },
                    { description: { [Op.like]: `%${term}%` } }
                ]
            },
            include: [{
                model: db.category,
                as: 'category'
            }]
        });
        res.status(200).send(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllProducts, getOneProduct, addProduct, deleteProduct, updateProduct, searchProducts }
