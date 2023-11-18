import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('Bloglist test', () => {
  let container;

  beforeEach(() => {
    const blog = {
      id: 1,
      title: 'This is a title',
      author: 'umesh',
      url: 'http://bloglist.com',
      likes: 100,
      user: { username: 'testuser' },
    };
    const user = { username: 'testuser' };

    const showDetails = jest.fn();
    const deleteDetails = jest.fn();

    container = render(
      <Blog
        blog={blog}
        showDetails={showDetails}
        user={user}
        deleteblog={deleteDetails}
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

    screen.debug(button);

    const view = container.querySelector('.renderLikes');
    screen.debug(view);

    expect(view).toHaveTextContent('http://bloglist.com');
    expect(view).toHaveTextContent('likes');
  });
});
