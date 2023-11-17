import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

test('renders blog title and author', () => {
  const blog = {
    title: 'This is a title',
    author: 'umesh',
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.border');
  expect(div).toHaveTextContent('This is a title');
  expect(div).toHaveTextContent('umesh');
});
