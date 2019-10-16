const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  naem: 'ohfosho', // deafult sid, will be an env variable
  secret: 'keep it secret!', // will be an env variable
  cookie: {
    httpOnly: false, // client JS cannot access the cookie
    maxAge: 1000 * 60 * 60, // expiration time in milliseconds
    secure: false, // only send cookies over HTTPS. true in production for ease
  },
  resave: false, // don't resave if cookie not changed
  saveUninitialized: false, //GDPR regulation, cannot send cookies automatically
}

// global middleware
server.user(sessions(sessionConfig)) // turn on sessions, pass it a session config obj
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
