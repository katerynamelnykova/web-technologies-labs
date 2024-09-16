const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let usersInRooms = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('join room', ({ username, room }) => {
        socket.join(room);
        socket.username = username;
        socket.room = room;

        if (!usersInRooms[room]) {
            usersInRooms[room] = [];
        }
        usersInRooms[room].push(username);

        io.to(room).emit('user joined', {
            username: username,
            usersInRoom: usersInRooms[room],
        });
        io.to(room).emit('system message', {
            message: `User ${username} joined the room`
        })
    });

    socket.on('chat message', (msg) => {
        const time = new Date().toLocaleTimeString();
        io.to(socket.room).emit('chat message', {
            username: socket.username,
            time: time,
            message: msg
        });
    });

    socket.on('disconnect', () => {
        if (socket.room) {
            usersInRooms[socket.room] = usersInRooms[socket.room].filter(user => user !== socket.username);
            io.to(socket.room).emit('user left', {
                username: socket.username,
                usersInRoom: usersInRooms[socket.room],
            });

            io.to(socket.room).emit('system message', {
                message: `User ${socket.username} left the room`
            })
        }
    });
});

server.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});
