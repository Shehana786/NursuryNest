const express = require('express');
const http = require('http'); // ✅ Required for server creation
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors');
const socketIO = require('socket.io'); // ✅ Make sure to import it
require('dotenv').config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app); // ✅ Use http.createServer()

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Store io instance in app
app.set('io', io);

// Routes
const authRoutes = require('./Routes/AuthRoutes');
const plantRoutes = require('./Routes/PlantRoutes');
const orderRoutes = require('./Routes/OrderRoutes');
const adminOrderRoutes = require("./Routes/AdminOrderRoutes");
const stockAdminRoute = require('./Routes/stockAdminRoute');

app.use('/api/auth', authRoutes); 
app.use('/api/products', plantRoutes); // for users
app.use('/api/orders', orderRoutes); 
app.use('/api/admin/products', plantRoutes); // for admin
app.use("/api/admin/orders", adminOrderRoutes); // for admin
app.use("/api/admin", stockAdminRoute); // stock API

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    server.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
