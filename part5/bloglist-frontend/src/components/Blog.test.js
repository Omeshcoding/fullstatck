import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('Bloglist test', () => {
  let container;
  const mockUpdateLike = jest.fn();
  beforeEach(() => {
    const user = { username: 'umesh_', id: 1 };
    const blog = {
      id: 1,
      title: 'This is a title',
      author: 'umesh',
      url: 'http://bloglist.com',
      likes: 100,
      user: { username: 'testuser', id: 1 },
    };
    const deleteDetails = jest.fn();

    container = render(
      <Blog
        blog={blog}
        updateLike={mockUpdateLike}
        user={user}
        id={blog.id}
        removeBlog={deleteDetails}
      />
    ).container;
  });

  test('renders blog title and author', () => {
    const div = container.querySelector('.border');
    expect(div).toHaveTextContent('This is a title');
    expect(div).toHaveTextContent('umesh');
  });

  test('after clicking the button, show url and number of likes', async () => {
    const userShow = userEvent.setup();

    const button = container.querySelector('.showBtn');
    await userShow.click(button);

    const view = container.querySelector('.renderLikes');
    // screen.debug(view);
    expect(view).toBeDefined();
    expect(view).toHaveTextContent('http://bloglist.com');
    expect(view).toHaveTextContent('likes');
  });

  test('like button is clicked twice the prop is called twice', async () => {
    const button = container.querySelector('.showBtn');
    const userShow = userEvent.setup();
    userShow.click(button);

    const likeButton = container.querySelector('.likeBtn');
    await userShow.click(likeButton);
    await userShow.click(likeButton);

    expect(mockUpdateLike.mock.calls).toHaveLength(2);
  });
});
