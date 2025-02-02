const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

io.on('connection', (socket) => {
 socket.on('join-room',(userId)=>{
    socket.join(userId)
    
 })
 socket.on('send-message',(message)=>{
    // console.log(message)
    io.to(message.receiverId)
    .to(message.senderId)
    .emit('recive-message',message)
 })
  
});


module.exports = { app, server, io };
