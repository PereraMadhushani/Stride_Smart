import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from 'http';
import { leaveRouter } from "./Routes/leaveRoute.js";
import { adminRouter } from "./Routes/AdminRoute.js";
import { employeeRouter } from "./Routes/EmployeeRoute.js";
import { driverRouter } from "./Routes/DriverRoute.js";
import { loginRouter } from "./Routes/loginRoute.js";
import { countRouter } from "./Routes/CountRoute.js";
import { Server } from "socket.io";
import http from "http";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow your frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Middleware to parse JSON data
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// Sample route
app.get('/example', (req, res) => {
    res.send('Hello from the example route!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/leave', leaveRouter(io)); 
app.use('/admin', adminRouter(io)); 
app.use('/employee', employeeRouter()); 
app.use('/driver', driverRouter()); 
app.use('/login', loginRouter());
app.use('/count', countRouter());
app.use(express.static('Public'));

// Handle Socket.IO connections
let connectedClients = [];
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Store connected client
    connectedClients.push(socket);
    // Disconnect handler
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        connectedClients = connectedClients.filter(client => client.id !== socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {io}
