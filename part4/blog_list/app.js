const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const url = config.MONGODB_BLOG;
mongoose.connect(url).then(() => {
  console.log('connected to database');
});

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
