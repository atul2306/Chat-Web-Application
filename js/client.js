const socket=io('http://localhost:8000');
// get DOM elements in respective Js variable
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio('2.mp3');
// function which will append event info to  the container
const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left')
audio.play();
}
// if form get submitted send message to server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})
// ask new user for his/her name and let server know
const name =prompt("enter your name to join");
socket.emit('new-user-joined', name )
//if new user join,receive event from server
socket.on('user-joined',name=>{
append(`${name} joined the chat`,'left')
}) 
// if server sent message receive it
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
    }) 
    // if user leaves th chat append info to container
    socket.on('left',name=>{
        append(`${name} left the chat`,'right')
    })