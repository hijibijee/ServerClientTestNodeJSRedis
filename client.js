const io = require("socket.io-client")
const socket = io("ws://localhost:3000");

socket.on("connect", 
    () => {  
        socket.send("taif"); //userName     
    }
);

socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
});

socket.on("message", 
    (data) => {  
        console.log("[received] " + data.toString());
    }
);