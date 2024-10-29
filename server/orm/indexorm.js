const {Sequelize,DataTypes}=require('sequelize');
const config =require('../database/config.json');

const connect = new Sequelize(config.database,config.user,config.password,{
    host:config.host,
    dialect:'mysql'
})

const db ={};
db.Sequelize=Sequelize;
db.connect=connect;


db.user=require('./user')(connect,DataTypes);
db.product=require('./products')(connect,DataTypes);
db.orders=require('./order')(connect,DataTypes);
db.category=require('./category')(connect,DataTypes);
//connect.sync({ force: true }); 
//connect.sync({ alter: true })
//connect.sync({ force: true })
connect.authenticate()
  .then(() => console.log("Sequelize database is connected successfully***"))
  .catch((error) => console.log(error))

  db.product.belongsTo(db.category);
  db.category.hasMany(db.product);

  db.user.hasMany(db.orders);
  db.orders.belongsTo(db.user);




  module.exports=db;
