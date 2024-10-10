const express = require("express");
const cors = require("cors");
const PORT =process.env.PORT || 3000;
const app = express();

app.use(express.json());
const db=require('./orm/indexorm')
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
