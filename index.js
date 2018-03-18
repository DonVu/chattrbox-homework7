var http = require("http");
var fs = require("fs");
var extract = require("./extract");

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    res.end(data);
  });
});
server.listen(3000);
