import axios from 'axios';
const baseUrl = 'http://localhost:4001/api/blogs';

const token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get('http://localhost:4001/api/blogs');
  return request.then((response) => response.data);
};

export default { getAll };
