describe('template spec', () => {
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
  });
});
