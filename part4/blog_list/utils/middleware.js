const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === 'JsonWebTokenError') {
    console.log({ error: error.message });
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next();
};

// Authorization
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    request.token = token;
  }
  next();
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  } else {
    request.user = decodedToken.id;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
