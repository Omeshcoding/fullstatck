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
        cy.get('#username').type('umeshds_');
        cy.get('#password').type('sdfjfkskooo');
        cy.get('#submit').click();
      });
      it('A blog can be created', function () {
        cy.contains('create new blog').click();
        cy.get('#title').type('Cypress is Awesome');
        cy.get('#author').type('Test');
        cy.get('#url').type('http://test.com');
        cy.get('#create').click();
        cy.get('.border').contains('Cypress is Awesome').should('be.visible');
        cy.get('.border').contains('Test').should('be.visible');
      });
    });
  });
});
