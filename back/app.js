const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about/about');
const authRouter = require('./routes/auth/auth');
const usersRoute = require('./routes/users/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/auth', authRouter);
app.use('/users', usersRoute);

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});
//module.exports = app;
