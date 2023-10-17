const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

// Serve static files from "public" directory
app.use(express.static('public'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Broadcast message to all connected clients
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
