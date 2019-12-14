// small helper function for selecting element by id
let id = id => document.getElementById(id);

let username = localStorage.getItem("username");
while (!username) {
    username = prompt("Please enter your username");
}
localStorage.setItem("username", username);

let xhr = new XMLHttpRequest();
xhr.open('GET', '/history');
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
    if (xhr.status !== 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
        console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
        for (let msg of JSON.parse(xhr.response)) {
            updateChat(msg);
        }
    }
};

xhr.onerror = function() {
    alert("Request failed");
};


let ws;
connectWs();

function connectWs() {
    // Establish the WebSocket connection and set up event handlers
    ws = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chat?user=" + username);
    ws.onmessage = msg => updateChat(msg.data);
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
    let data = JSON.parse(msg);
    id("chat").insertAdjacentHTML("afterbegin", data.userMessage);
    id("userList").innerHTML = data.userList.map(user => "<li>" + user + "</li>").join("");
}
