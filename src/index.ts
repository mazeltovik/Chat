import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('chat-message', (data) => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', (name) => {
    appendMessage(name);
});
const messageContainer = document.getElementById('message-container') as HTMLDivElement;
const messageForm = document.getElementById('send-container') as HTMLFormElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
// const name = prompt('Name?','');
appendMessage('You Joinded');
socket.emit('new-user', name);

socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message: string) {
    const messageElem = document.createElement('div');
    messageElem.textContent = message;
    messageContainer.append(messageElem);
}
