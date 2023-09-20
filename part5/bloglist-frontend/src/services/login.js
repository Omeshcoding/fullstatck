import axios from 'axios';
const baseUrl = 'http://localhost:4001/api/login';

const login = async (credentials) => {
  const response = await axios.post(
    'http://localhost:4001/api/login',
    credentials
  );
  return response.data;
};
export default { login };
