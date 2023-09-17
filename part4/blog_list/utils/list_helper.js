const dummy = (blogs) => {
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
  const max = Math.max(...blogs.map((blog) => blog.likes));
  return max;
};

module.exports = { dummy, totalLikes, favoriteBlog };
