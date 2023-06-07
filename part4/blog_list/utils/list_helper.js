const dummy = (blogs) => {
  // console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, curr) => {
    acc += curr.likes;
    return acc;
  };
  // console.log(blogs);

  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs.reduce(reducer, 0);
  } else {
    return blogs.reduce(reducer, 0);
  }
};

module.exports = { dummy, totalLikes };
