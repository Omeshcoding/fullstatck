/* eslint-disable no-undef */
require('dotenv').config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

// eslint-disable-next-line no-undef
const MONGODB_BLOG = process.env.MONGODB_BLOG;
module.exports = {
  MONGODB_BLOG,
  PORT,
};
