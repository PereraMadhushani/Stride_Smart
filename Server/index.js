import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from 'http';
import { leaveRouter } from "./Routes/leaveRoute.js";
import {adminRouter} from "./Routes/AdminRoute.js";
import { employeeRouter } from "./Routes/EmployeeRoute.js";
import { driverRouter } from "./Routes/DriverRoute.js";
import { loginRouter } from "./Routes/loginRoute.js";
import { countRouter } from "./Routes/CountRoute.js";
import { Server } from "socket.io";
import http from "http";
import con from './Utils/db.js';
import './WebSocket/WebSocket.js';


// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Your frontend origin
        methods: ['GET', 'POST']
    }
});
/* Middleware to attach io instance to each request
app.use((req, res, next) => {
    req.io = io;
    next();
});*/

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Sample route
app.get('/example', (req, res) => {
    res.send('Hello from the example route!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Attach routers
app.use('/leave', leaveRouter(io)); 
app.use('/admin', adminRouter(io)); 
app.use('/employee', employeeRouter(io)); 
app.use('/driver', driverRouter(io)); 
app.use('/login', loginRouter(io));
app.use('/count', countRouter(io));
app.use('/Images',express.static('Public/Images'));

// Handle Socket.IO connections
let connectedClients = [];
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    connectedClients.push(socket);


    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        connectedClients = connectedClients.filter(client => client.id !== socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { io };
