const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require("http");
const Server = require("socket.io");

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about/about');
const authRouter = require('./routes/auth/auth');
const usersRoute = require('./routes/users/users');
const servicesRouter = require('./routes/services/services');
const apiWeatherRouter = require('./routes/api/weather/weather');
const apiLocationRouter = require('./routes/api/location/location');
const weatherRouter = require('./routes/weather/weather');
const dashboardRouter = require('./routes/dashboard/dashboard');
const downloadRouter = require('./routes/download/download');
const ARRouter = require('./routes/actionReaction/actionReaction');

const app = express();
const server = http.createServer(app);
const io = Server(server, {origins: '*:*'});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
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
app.use('/services', servicesRouter);
app.use('/api/weather', apiWeatherRouter);
app.use('/api/location', apiLocationRouter);
app.use('/weather', weatherRouter);
app.use('/dashboard', dashboardRouter);
app.use('/download', downloadRouter);
app.use('/AR', ARRouter);

require('./bot_discord/app');
require('./bot_telegram/app')
require('./socket/socket')(io);

function loopAR(i) {
    setTimeout(async () => {
        console.log('AR reload loop n:', i);
        await require('./twitch/twitch').reloadStreamsManagement();
        loopAR(++i);
    }, 30000)
}

loopAR(0);

server.listen(8080, () => {
    console.log('listening on *:8080');
});

//module.exports = app;
