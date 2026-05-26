import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//connection event
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  //0: connecting
  //1: open
  //2: closing
  //3: closed

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Server Broadcast: ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.error(`Error: ${err.message} :${ip}`);
  });

  socket.on("close", () => {
    console.log(`Client Disconnected`);
  });
});

console.log("WebSocket Server is running on ws://localhost:8080");
