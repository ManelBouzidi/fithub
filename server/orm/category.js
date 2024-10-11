const {DataTypes}=require('sequelize');

module.exports=(connect,DataTypes)=>{
    const category=connect.define('category',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },
    {
      timestamps:false,
    })
    return category
}