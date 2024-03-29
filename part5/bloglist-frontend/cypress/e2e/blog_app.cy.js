describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user = {
      name: 'Umesh Sharma',
      username: 'umeshds_',
      password: 'sdfjfkskooo',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('Login form is shown', () => {
    cy.contains('username');
    cy.contains('password');
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('umeshds_');
      cy.get('#password').type('sdfjfkskooo');
      cy.get('#submit').click();
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('umeshds_');
      cy.get('#password').type('wrongpassword');
      cy.get('#submit').click();
      cy.get('.error_message')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'border-style', 'solid')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'umeshds_', password: 'sdfjfkskooo' });
        cy.createBlog({
          title: 'Cypress is Awesome',
          author: 'Test',
          url: 'http://test.com',
          likes: 1110,
        });
      });
      it('A blog can be created', function () {
        cy.get('.border').contains('Cypress is Awesome').should('be.visible');
        cy.get('.border').contains('Test').should('be.visible');
      });
      it('Users can like a blog', function () {
        cy.get('.showBtn').click();
        cy.get('.renderLikes').should('contain', 'likes 1110');
        cy.get('.likeBtn').click();
        cy.get('.renderLikes').should('contain', 'likes 1111');
      });
      it('creator can delete their own blog', function () {
        cy.get('.border').should('contain', 'Cypress is Awesome');
        cy.get('.showBtn').click();
        cy.contains('remove').click();
        cy.contains('Cypress is Awesome').should('not.exist');
      });

      it('delete button is not visible to other users', function () {
        const user = {
          name: 'unknown',
          username: 'unknownuser',
          password: 'testpassword',
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
        cy.loginAsDifferentUser({
          username: 'unknownuser',
          password: 'testpassword',
        });

        cy.get('.border').should('contain', 'Cypress is Awesome');

        cy.get('.showBtn').click();
        cy.contains('remove').should('not.exist');
      });
      describe('Sort the bloglist', function () {
        it('sort the bloglist according to likes', function () {
          cy.createBlog({
            title: 'The title with the second most likes',
            author: 'Test2',
            url: 'http://test.com',
            likes: 1112,
          });
          cy.createBlog({
            title: 'The title with the most likes',
            author: 'Test1',
            url: 'http://test.com',
            likes: 1114,
          });

          cy.get('.border')
            .eq(0)
            .should('contain', 'The title with the most likes');
          cy.get('.border')
            .eq(1)
            .should('contain', 'The title with the second most likes');
        });
      });
    });
  });
});
