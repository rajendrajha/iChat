const socket= io('http://localhost:8000')
messageContainer= document.querySelector('.container2');
messageInput= document.querySelector('#input');
messageForm= document.getElementById('form')
const append=(message, position)=>{
    const messagearea= document.createElement('div');
    messagearea.innerHTML= message;
    messagearea.classList.add('message')

    messagearea.classList.add(position)
    messageContainer.append(messagearea)
}
messageForm.addEventListener('submit',(e)=>{
 e.preventDefault();
 const message= messageInput.value;
 append(`You: ${message}`, 'right')
 socket.emit('send-msg', message)
 messageInput.value='';
})
let a = prompt("Enter Your Name");
socket.emit('new-user-joined', a);
socket.on('user-joined', name=>{
 append(`${name} joined the chat`,'left')
})
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'left')
})
