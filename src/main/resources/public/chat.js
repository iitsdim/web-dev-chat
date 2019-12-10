// small helper function for selecting element by id
let id = id => document.getElementById(id);

let username = prompt("Please enter your username");

let ws;
connectWs();

function connectWs() {
    // Establish the WebSocket connection and set up event handlers
    ws = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chat?user=" + username);
    ws.onmessage = msg => updateChat(msg);
    ws.onclose = () => connectWs();
}


// Add event listeners to button and input field
id("send").addEventListener("click", () => sendAndClear(id("message").value));
id("message").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) { // Send message if enter is pressed in input field
        sendAndClear(e.target.value);
    }
});

function sendAndClear(message) {
    if (message !== "") {
        ws.send(message);
        id("message").value = "";
    }
}

function updateChat(msg) { // Update chat-panel and list of connected users
    let data = JSON.parse(msg.data);
    id("chat").insertAdjacentHTML("afterbegin", data.userMessage);
    id("userList").innerHTML = data.userList.map(user => "<li>" + user + "</li>").join("");
}
