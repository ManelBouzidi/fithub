const express = require("express");
const userRoutes=require("./routes/userRoute.js");
const productRoutes=require("./routes/productRoute.js");
const oredersRoutes=require("./routes/ordersRoutes.js");
const categories=require("./routes/categoryRoutes.js")
const cors = require("cors");
const PORT =process.env.PORT || 3000;
const app = express();
5
app.use(express.json());
const db=require('./orm/indexorm')
app.use(cors());
app.use("/order",oredersRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);
app.use("/category",categories);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
