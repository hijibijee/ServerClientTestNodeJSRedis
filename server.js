const Redis = require("redis")
const Promise = require("bluebird")
const redis = Redis.createClient({
    host: '127.0.0.1',
    port: 6379
});
const { Server } = require("socket.io");
const io = new Server({});
var clientCount = 0;

Promise.promisifyAll(redis)

io.on("connection", (socket) => {
    clientCount++;
    console.log("[Client connected]")
    socket.on("message", (data) => { 
        //console.log("Received client no: " + clientCount)
        console.log("[received] " + data.toString())
        //socket.send(data.toString().toUpperCase())
        // const queryRes = (async () => {
        //     await isUser(data.toString())
        // })()
        // let queryRes = (async () => { isUser(data.toString()) })()
    
        // console.log("Result: " + queryRes)
        // console.log("Normal result: " + isUser(data.toString()))
        // if(isUser(data.toString()).then()){
        //     console.log("Accepted")
        //     socket.send("Ok")
        // }
        // else{
        //     console.log("Rejected")
        //     socket.send("-1")
        // }

        isUser(data.toString()).then(
            (result) => {
                if(result == 1) socket.send("Hello " + data.toString())
                else socket.send("Oops...")
            }
        ).catch((err) => console.log(err))
    });
});

io.listen(3000);

redis.on('connect', 
    function() {
        console.log("[Redis server connected]")
    }
)

async function isUser(userName){
    return redis.sismemberAsync("user", userName)
}