import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlogFrom = ({ addBlog, setNotification }) => {
  const [newblog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

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
            type="text"
            value={newblog.title}
            name="Title"
            onChange={({ target }) => handleNewBlog({ title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newblog.author}
            name="Author"
            onChange={({ target }) => handleNewBlog({ author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newblog.url}
            name="url"
            onChange={({ target }) => handleNewBlog({ url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogFrom;
