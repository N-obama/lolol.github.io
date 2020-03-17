
var express = require ('express'); 

var app = express ();
var server = app.listen (3000); 

app.use (express.static ('public1'));

console.log ("console ran");

var socket = require ('socket.io');

var io = socket (server);

io.sockets.on ('connection', newConnection);

function newConnection (socket) {
	console.log ('new connection: ' + socket.id);

	 socket.on ('pl', mm);

	function mm(data) {
		socket.broadcast.emit ('pl', data);
	} 

}
