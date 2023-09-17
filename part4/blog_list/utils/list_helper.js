const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, curr) => {
    acc += curr.likes;
    return acc;
  };

  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs.reduce(reducer, 0);
  } else {
    return blogs.reduce(reducer, 0);
  }
};
const favoriteBlog = (blogs) => {
  let mostLikedBlog = blogs[0];
  blogs.map((blog, i) => {
    if (blogs[i].likes > mostLikedBlog.likes) {
      return (mostLikedBlog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      });
    }
  });

  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  let mostBlogsByAuthor = _.countBy(blogs, 'author');
  const authorName = _.maxBy(
    _.keys(mostBlogsByAuthor),
    (author) => mostBlogsByAuthor[author]
  );
  return {
    author: authorName,
    blogs: mostBlogsByAuthor[authorName],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
