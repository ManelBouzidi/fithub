const {DataTypes}=require('sequelize');

module.exports=(connect,DataTypes)=>{
    const orders=connect.define('orders',{
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        products:{
            type:DataTypes.JSON //pour stocker les produits dans un tableau json
        }
    },
    {
      timestamps:false,
    })
    return orders
}