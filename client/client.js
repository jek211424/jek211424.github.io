
var chatbox
var messages = []

var messagebox
var sendbutton
var boxselect

var socket

const serverip = "192.168.1.18:8080"
const maxmessages = 100

const malformedwarning = "The server sent a malformed or unsupported packet. Some data was not received."

window.onload = function() {
    chatbox = document.getElementById("chat")
    messagebox = document.getElementById("message")
    sendbutton = document.getElementById("send")

    messagebox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          sendbutton.click();
        }
    }); 


    sysPrint("Connecting to server at " + serverip + "...")
    connect(function(success, soc) {
        socket = soc
        if (success) {
            sysPrint("Connection established!")
            setupchat()
        } else {
            sysPrint("Connection failed. Please try again later.")
        }
    })
}

function setupchat() {
    socket.addEventListener("close", connectionClosed)
    socket.addEventListener("error", connectionError)
    socket.addEventListener("message", handleMessage)
    sendbutton.onclick = processSend
}

function processSend() {
    socket.send(createPlainText(messagebox.value))
    messagebox.value = ""
}

function updateScroll(){
    var element = chatbox;
    element.scrollTop = element.scrollHeight;
}


function handleMessage(event) {
    console.log(event.data)
    try {
        var dat = JSON.parse(event.data)
    
        if (dat.type == 0) {
            printMessage(dat.data)
            return
        }
        warnPrint(malformedwarning)
    } catch (e) {
        warnPrint(malformedwarning + " " + e)
    }
}

function connectionClosed() {
    sysPrint("The connection to the server was closed. Refresh the page to reconnect.")
}

function connectionError(event) {
    sysPrint("There was an error and the server sent this error code: " + event.code + " Refresh the page in a few moments to reconnect.")
}

function connect(callback) {
    var socket = new WebSocket("ws://" + serverip)

    function onopen() {
        socket.removeEventListener("open", onopen)
        socket.removeEventListener("close", onclose)
        callback(true, socket)
    }
    function onclose() {
        socket.removeEventListener("open", onopen)
        socket.removeEventListener("close", onclose)
        callback(false)
    }

    socket.addEventListener("open", onopen);
    socket.addEventListener("close", onclose)
}

function createPlainText(msg){
    return '{"type":0,"data":"' + msg + '"}'
}

function sysPrint(msg) {
    printMessage("System: " + msg)
}
function warnPrint(msg) {
    printMessage("Warning: " + msg)
}

function printMessage(msg) {
    messages.unshift(msg)

    if (messages.length > maxmessages) {
        messages.pop()
    }
    rerenderBox()
    updateScroll()
}

function rerenderBox() {
    chatbox.innerHTML = ""
    for (let i = messages.length - 1; i >= 0; i--) {
        var message = messages[i]
        if (message.startsWith("System") || message.startsWith("Server")) {
            chatbox.innerHTML += '<p><span class="system">' + message + "</span></p>"
        } else if (message.startsWith("Warning")) {
            chatbox.innerHTML += '<p><span class="warning">' + message + "</span></p>"
        } else {
            chatbox.innerHTML += '<p>' + message + "</p>"
        }
    } 
}