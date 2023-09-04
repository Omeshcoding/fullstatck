const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
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

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === null ? 0 : body.likes,
  });

  if (body.title && body.url) {
    const savedBlog = await blog.save();
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
