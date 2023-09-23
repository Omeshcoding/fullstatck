import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import {
  ErrorNotification,
  SuccessNotification,
} from './components/Notification';
import Togglable from './components/Togglable';
import CreateBlogFrom from './components/CreateBlogFrom';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleAddBlog = (newObject) => {
    console.log(newObject);
    blogService.create(newObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      {notification.type === 'success' && (
        <SuccessNotification
          message={notification.message}
          type={notification.type}
        />
      )}
      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new note">
            <CreateBlogFrom
              addBlog={handleAddBlog}
              setNotification={setNotification}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
