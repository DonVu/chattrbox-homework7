var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = "";

console.log("websockets server started");

ws.on("connection", function (socket) {
  console.log("client connection established");

  // print out current topic
  socket.send(topic);

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on("message", function (data) {
    console.log("message received:" + data);
    messages.push(data);
    var topicParse = data.substring(0, 6);

    ws.clients.forEach(function (clientSocket) {
      if (topicParse == "/topic") {
        var restOfTopic = data.substring(7);
        topic = "*** Topic is '" + restOfTopic + "'";
        clientSocket.send("*** Topic has changed to '" + restOfTopic + "'");
      }

      clientSocket.send(data);
    });
  });
});
