const messageArea = document.getElementById('messageArea');
const inputMessage = document.getElementById('inputMessage');
const sendMessage = document.getElementById('sendMessage');

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    displayMessage(event.data);
};

sendMessage.addEventListener('click', () => {
    const message = inputMessage.value;
    if (message) {
        ws.send(message);
        displayMessage(`Me: ${message}`);
        inputMessage.value = '';
    }
});

function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageArea.appendChild(messageDiv);
}
