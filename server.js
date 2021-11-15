const { Server } = require("socket.io");

const io = new Server({});

io.on("connection", (socket) => {
    console.log("[Client connected]")
    socket.on("message", (data) => { 
        console.log("[received] " + data.toString())
        socket.send(data.toString().toUpperCase()) 
    });
});

io.listen(3000);