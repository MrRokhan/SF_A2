const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');  // Import http to use with Socket.io
const socketIo = require('socket.io');  // Import Socket.io

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for serving static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer to save uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);  // Where the files should be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Create unique filename
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
        origin: '*',  // Allow all origins
        methods: ['GET', 'POST']
    }
});

// Listen for client connections on Socket.io
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for chat messages from the client
    socket.on('chatMessage', (msg) => {
        console.log('Message received:', msg);
        // Broadcast the message to all connected clients
        io.emit('chatMessage', msg);
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
