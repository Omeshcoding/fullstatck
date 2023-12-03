Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:4001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
    cy.visit('http://localhost:5173');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const likeCount = likes ? likes : 0;

  cy.request({
    url: 'http://localhost:4001/api/blogs',
    method: 'POST',
    body: {
      title: `${title}`,
      author: `${author}`,
      url: `${url}`,
      likes: `${likeCount}`,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  });

  cy.visit('');
});

Cypress.Commands.add('loginAsDifferentUser', ({ username, password }) => {
  cy.request('POST', 'http://localhost:4001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
    cy.visit('http://localhost:5173');
  });
});
