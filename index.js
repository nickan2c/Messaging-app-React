const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) =>{
    console.log(`User connnected ${socket.id}`);

    socket.on("joinRoom", (data)=>{ // data passes room ID
        socket.join(data);
        console.log(`user with ID: ${socket.id} joined the room ${data}`)
    });

    socket.on("send_message", (data) => { // listens for send_message event 
        // sends message to everyone in room, with this tag, which the clients will await
        socket.to(data.room).emit("receive_message", data); // send a message with this event tag
    });

    
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    });
}) // listening for event connection , prints this on connection


server.listen(3001, () => console.log('server running'));
