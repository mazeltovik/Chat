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

async function getInformation() {
    let res = await fetch('http://localhost:3000/api/server');
    if (res.ok) {
        let data = await res.json();
        console.log(data);
    }
}
async function createUser(name: string, age: number) {
    let body = {
        name: name,
        age: age,
    };
    let res = await fetch('http://localhost:3000/api/server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (res.ok) {
        console.log(await res.json());
    } else {
        console.log('Ошибка HTTP: ' + res.status);
    }
}

getInformation();

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
