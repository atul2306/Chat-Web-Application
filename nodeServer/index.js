

// Node server will handle socket
const io = require('socket.io')(8000)
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        //console.log("New user", name);
        // if any new user join let other usersconnected to server time
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    }); 
    // if someoe send broadcast to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
   // if someoe leaves the chat broadcast to other people
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });
})
