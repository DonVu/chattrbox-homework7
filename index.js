var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");
  fs.readFile("app/index.html", function (err, data) {
    res.end(data);
  });
});
server.listen(3000);
