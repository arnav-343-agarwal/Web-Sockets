const http = require('http')
const express = require('express')
const path  = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
