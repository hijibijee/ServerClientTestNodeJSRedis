const { io } = require("socket.io-client");

const URL = process.env.URL || "http://localhost:3000";
const MAX_CLIENTS = 8000;
const POLLING_PERCENTAGE = 0.05;
const CLIENT_CREATION_INTERVAL_IN_MS = 0.001;
const EMIT_INTERVAL_IN_MS = 0;

let clientCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

const createClient = () => {
  // for demonstration purposes, some clients stay stuck in HTTP long-polling
  const transports =
   Math.random() < POLLING_PERCENTAGE ? ["polling"] : ["polling", "websocket"];

  const socket = io(URL, {
   transports,
  });

//   setInterval(() => {
//     socket.emit("client to server event");
//   }, EMIT_INTERVAL_IN_MS);

  socket.on('connect', () => {
      ++clientCount
      const userName = 'user' + (Math.floor(Math.random() * 16000) + 1).toString();
      socket.send(userName)
  })

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

//   socket.on("message", (data) => {
//       console.log(data.toString())
//   })
//   // ++clientCount
//   if (++clientCount < MAX_CLIENTS) {
//     setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
//   }
};

createClient();

async function clientLoop(){
    for(let i = 0; i < 8000; i++){
        createClient()
    }
}

clientLoop()

const printReport = () => {
//   const now = new Date().getTime();
//   const durationSinceLastReport = (now - lastReport) / 1000;
//   const packetsPerSeconds = (
//     packetsSinceLastReport / durationSinceLastReport
//   ).toFixed(2);

  console.log(
    `client count: ${clientCount}`// ; average packets received per second: ${packetsPerSeconds}`
  );

//   packetsSinceLastReport = 0;
//   lastReport = now;
};

setInterval(printReport, 1000);