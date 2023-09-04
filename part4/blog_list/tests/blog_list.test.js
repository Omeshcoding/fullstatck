const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

test('blogs are returned in correct json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('Verify if identifier is named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.map((elem) => expect(elem.id).toBeDefined());
});

test('Post request creates a new blog post', async () => {
  const newBlog = {
    title: 'Next.js is awesome',
    author: 'Umesh',
    url: 'https://umeshblogs.vercel.app/post/nextjs',
    likes: 200,
  };

  const response = await api.get('/api/blogs');
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const contents = response.body.map((blog) => blog.url);
  const blogs = await Blog.find({});
  const savedblog = blogs.map((blog) => blog.toJSON());
  expect(savedblog).toHaveLength(response.body.length + 1);
  expect(contents).toContain('https://umeshblogs.vercel.app/post/nextjs');
});

test('verify if likes property is there', async () => {
  const response = await api.get('/api/blogs');
  response.body.map((elem) => expect(elem).toHaveProperty('likes'));
});
test('blog without a title and url is not added', async () => {
  const newBlog = {
    author: 'Umesh',
    likes: 200,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
});
afterAll(async () => {
  await mongoose.connection.close();
});
