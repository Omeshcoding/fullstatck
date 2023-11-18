import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, user }) => {
  const [show, setShow] = useState(false);
  const viewBlog = () => {
    setShow(!show);
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
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
        <button className="showBtn" onClick={viewBlog}>
          {!show ? 'view' : 'hide'}
        </button>
      </p>
      {show && (
        <div>
          <div className="renderLikes">
            <a href=""> {blog.url}</a>
            <br />
            likes {blog.likes === null ? 0 : blog.likes}{' '}
            <button className="likeBtn" onClick={() => updateLike()}>
              like
            </button>
          </div>
          <br />
          <div>
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
        </div>
      )}
    </div>
  );
};

export default Blog;
