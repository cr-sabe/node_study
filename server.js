let http = require("http");

let server = http.createServer();
server.on("request", function(req, res) {
	res.write("Hello Wolrd.");
	res.end();
});
server.listen(8080);

console.log("running at http://127.0.0.1:8080/");
