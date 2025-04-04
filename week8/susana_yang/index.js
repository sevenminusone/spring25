const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chatdb');
}

const messageSchema = new mongoose.Schema({
  nickname: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

main().then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


let users = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  users[socket.id] = "Anonymous";
  io.emit('update users', Object.values(users));

  socket.on('set nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('update users', Object.values(users)); 
  });

  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} disconnected`);
    delete users[socket.id]; // Remove user
    io.emit('update users', Object.values(users)); // Update user list
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', users[socket.id]); // Notify others
  });

  socket.on('chat message', async (msg) => {
    io.emit('chat message', `${users[socket.id]}: ${msg}`);
    console.log(`${users[socket.id]}: ${msg}`);

    try {
      await Message.create({
        nickname: users[socket.id],
        message: msg
      });
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

app.get('/messages', async function(req, res) {
  res.json(await Message.find());  
});

