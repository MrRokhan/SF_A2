const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');  
const socketIo = require('socket.io');  

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for serving static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer to save uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  
    }
});
const upload = multer({ storage: storage });

// Route for profile image upload
app.post('/upload/profile', upload.single('avatar'), (req, res) => {
    if (req.file) {
        const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
        res.json({ message: 'Profile image uploaded successfully', filePath });
    } else {
        res.status(400).send({ error: 'No file uploaded' });
    }
});

// Route for chat image upload
app.post('/upload/chat', upload.single('chatImage'), (req, res) => {
    if (req.file) {
        const filePath = `/uploads/${req.file.filename}`;
        res.json({ message: 'Chat image uploaded successfully', filePath });
    } else {
        res.status(400).send({ error: 'No file uploaded' });
    }
});

// Create HTTP server and integrate Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Track users in channels
const usersInChannels = {};

// Socket.io logic
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a channel
    socket.on('joinChannel', ({ username, channel }) => {
        socket.join(channel);

        // Track users in channels
        if (!usersInChannels[channel]) {
            usersInChannels[channel] = [];
        }
        usersInChannels[channel].push(username);

        // Broadcast to all in the channel that a new user has joined
        io.to(channel).emit('userJoined', { username, usersInChannel: usersInChannels[channel] });
        console.log(`${username} joined ${channel}`);
    });

    // Listen for chat messages
    socket.on('chatMessage', ({ username, message, channel }) => {
        console.log(`${username} in ${channel}: ${message}`);
        // Broadcast to everyone in the channel
        io.to(channel).emit('chatMessage', { username, message });
    });

    // Handle user leaving
    socket.on('leaveChannel', ({ username, channel }) => {
        socket.leave(channel);

        // Remove user from tracking
        usersInChannels[channel] = usersInChannels[channel].filter(user => user !== username);

        // Notify others in the channel
        io.to(channel).emit('userLeft', { username, usersInChannel: usersInChannels[channel] });
        console.log(`${username} left ${channel}`);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
