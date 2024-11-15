/*const express = require("express");
const userRoutes = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");
const oredersRoutes = require("./routes/ordersRoutes.js");
const categories = require("./routes/categoryRoutes.js");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const db = require('./orm/indexorm');
app.use(cors());
app.use("/order", oredersRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categories);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('chat message', (message) => {
    console.log(`Message received: ${message}`);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
*/

const express = require("express");
const http = require("http"); // Import HTTP for Socket.IO integration
const { Server } = require("socket.io"); // Import Socket.IO
const userRoutes = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");
const ordersRoutes = require("./routes/ordersRoutes.js");
const categories = require("./routes/categoryRoutes.js");
const cors = require("cors");


const PORT = 3000;
const app = express();

// Set up body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Set up database (if required)
const db = require('./orm/indexorm');

// Enable CORS
app.use(cors());

// Define routes
app.use("/order", ordersRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categories);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your React app URL
    methods: ["GET", "POST"],
  },
});

// Set up Socket.IO connection

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("chat message", (message) => {
    console.log(`Message received: ${message}`);
    io.emit("chat message", message);
  });
});
  // Listen for chat messages
  socket.on("chat message", (message) => {
    console.log(`Message received: ${message}`); // Log message to debug
    io.emit("chat message", message); // Broadcast the message
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });


// Start the server
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

