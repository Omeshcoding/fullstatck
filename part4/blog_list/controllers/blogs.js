const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const User = require('../models/user');

const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// Post
blogRouter.post('/', async (request, response) => {
  const body = request.body;
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === null ? 0 : body.likes,
    user: user.id,
  });

  if (body.title && body.url) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } else {
    response.status(400).json();
  }
});
// Delete blog
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});
// Update Blog
blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const note = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });
  response.json(savedBlog);
});

module.exports = blogRouter;
