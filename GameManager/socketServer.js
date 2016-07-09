var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('../TestClient'));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	})
});

http.listen("3002", function(){
	console.log("Listening on port 3002");
});