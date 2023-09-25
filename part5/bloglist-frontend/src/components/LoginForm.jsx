import React, { useState } from 'react';
import { ErrorNotification } from '../components/Notification';
import blogService from '../services/blogs';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser }) => {
  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName('');
      setPassword('');
    } catch (error) {
      setNotification({
        message: 'Wrong username or password',
        type: 'error',
      });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
      console.log('wrong credentials');
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      {notification.type === 'error' && (
        <ErrorNotification
          message={notification.message}
          type={notification.type}
        />
      )}

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
