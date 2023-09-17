const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

const api = supertest(app);

const secret = 'thisissecret';

const user = {
  username: 'testuser',
  id: '650299e9350c269f596d218a',
};
const token = jwt.sign(user, secret);
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const contents = response.body.map((blog) => blog.url);
  const blogs = await Blog.find({});
  const savedblog = blogs.map((blog) => blog.toJSON());
  expect(savedblog).toHaveLength(response.body.length + 1);
  expect(contents).toContain('https://umeshblogs.vercel.app/post/nextjs');
}, 100000);

test('verify if likes property is there', async () => {
  const response = await api.get('/api/blogs');
  response.body.map((elem) => expect(elem).toHaveProperty('likes'));
});
test('blog without a title and url is not added', async () => {
  const newBlog = {
    author: 'Umesh',
    likes: 204,
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
}, 10000);

test('succeeds with status code 204 if id is valid', async () => {
  const blogId = '65054e7f9a065774bc07516f';

  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);
  // Verify that the blog is removed from the database
  const deletedBlog = await Blog.findById(blogId);
  expect(deletedBlog).toBeNull();
}, 100000);

test('succeeds with status code 200 if blog is updated', async () => {
  const updatedBlog = {
    title: 'Jest is awesome',
    author: 'Umesh',
    url: 'https://umeshblogs.vercel.app/post/nextjs',
    likes: 201,
  };
  await api
    .put(`/api/blogs/65054e2a72d9b9acb6a3fe15`)
    .send(updatedBlog)
    .expect(200);
}, 100000);
// test if users are valid
test('succeed with status code 400 if users are invalid', async () => {
  const user = {
    username: 'um',
    name: 'umesh',
    password: 'fs',
  };

  await api.post('/api/users').send(user).expect(400);
});

test('Fails with status code of 401 is token is not provided', async () => {
  const newBlog = {
    title: 'Jest is fantastic',
    author: 'Umesh',
    url: 'https://umeshblogs.vercel.app/post/nextjs',
    likes: 200,
  };
  await api.get('/api/blogs');
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
