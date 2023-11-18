import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateBlogFrom from './CreateBlogFrom';
import userEvent from '@testing-library/user-event';

test('<CreateBlogForm/> calls the event handler it received as props', async () => {
  const addBlog = jest.fn();
  const setNotification = jest.fn();
  const user = userEvent.setup();

  render(
    <CreateBlogFrom addBlog={addBlog} setNotification={setNotification} />
  );

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const createButton = screen.getByText('create');

  await user.type(titleInput, 'this is a test blog');
  await user.type(authorInput, 'testUser');
  await user.type(urlInput, 'bloglist.com');

  await user.click(createButton);
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('this is a test blog');
  expect(addBlog.mock.calls[0][0].author).toBe('testUser');
  expect(addBlog.mock.calls[0][0].url).toBe('bloglist.com');
});
