import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, removeBlog, user }) => {
  const [show, setShow] = useState(false);
  const viewBlog = () => {
    setShow(!show);
  };
  const updateLike = () => {
    const blogUpdate = ++blog.likes;
    const newObject = {
      user: blog.user.id,
      likes: blogUpdate,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    };

    blogService.update(blog.id, newObject);
  };

  return (
    <div className="border">
      <p>
        {' '}
        {blog.title} {blog.author}{' '}
        <button onClick={viewBlog}>{!show ? 'view' : 'hide'}</button>
      </p>
      {show && (
        <div>
          <a href=""> {blog.url}</a>
          <br />
          likes {blog.likes === null ? 0 : blog.likes}{' '}
          <button onClick={() => updateLike()}>like</button>
          <br />
          {blog.user?.username}
          <br />
          {user.username === blog.user?.username && (
            <button
              className="delete-btn"
              onClick={() => removeBlog(blog.id, blog.title, blog.author)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
