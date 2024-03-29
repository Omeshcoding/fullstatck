import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlogFrom = ({ addBlog, setNotification }) => {
  const [newblog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  CreateBlogFrom.propTypes = {
    addBlog: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
  };
  const handleAddBlog = (e) => {
    e.preventDefault();
    addBlog(newblog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
    setNotification({
      message: `a new blog ${newblog.title} by ${newblog.author} added`,
      type: 'success',
    });
    setTimeout(() => {
      setNotification({
        message: '',
        tyep: '',
      });
    }, 5000);
  };

  const handleNewBlog = (elem) => {
    setNewBlog((prev) => {
      return {
        ...prev,
        ...elem,
      };
    });
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newblog.title}
            name="Title"
            placeholder="title"
            onChange={({ target }) => handleNewBlog({ title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newblog.author}
            name="Author"
            placeholder="author"
            onChange={({ target }) => handleNewBlog({ author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newblog.url}
            name="url"
            placeholder="url"
            onChange={({ target }) => handleNewBlog({ url: target.value })}
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogFrom;
