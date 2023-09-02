const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

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

afterAll(async () => {
  await mongoose.connection.close();
});
