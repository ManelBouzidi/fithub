const {DataTypes}=require('sequelize');

module.exports=(connect,DataTypes)=>{
    const user =connect.define('user',{
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM,
            values:['user','admin'],//add roles
            defaultvalue:'user,'//default
        },
        
    },
    {
        timestamps:false,
    })
    return user
}