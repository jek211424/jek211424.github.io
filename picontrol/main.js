function loaded() {
	setInterval(pingtemp,5000);
	socket = new WebSocket("ws://192.168.0.71:41121")
	socket.onopen = function(e) {
		console.log("connected!");
		pingtemp();
	};
	socket.onclose = function(e) {
		console.error(`Disconnected from server for reason: ${e}`)
	}
	socket.onmessage = function(d) {
		document.getElementById("temp").innerHTML = d.data
	}
}

function red() {
	socket.send("r")
}
function green() {
	socket.send("g")
}
function blue() {
	socket.send("b")
}
function off() {
	socket.send("o")
}
function pingtemp() {
	socket.send("ping")
}