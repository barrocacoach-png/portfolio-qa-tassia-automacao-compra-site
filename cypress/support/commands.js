// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command for login
Cypress.Commands.add('login', () => {
	cy.visit('https://www.saucedemo.com/');
	cy.get('[data-test="login-container"]').should('be.visible');
	cy.get('[data-test="username"]').type('standard_user');
	cy.get('[data-test="password"]').type('secret_sauce');
	cy.get('[data-test="login-button"]').click();
	cy.url().should('include', '/inventory.html');
});

// Custom command to add items to cart
Cypress.Commands.add('addItemsToCart', (count = 1) => {
	cy.get('.inventory_item').each(($item, index) => {
		if (index < count) {
			cy.wrap($item).contains('Add to cart').click();
		}
	});
});

// Custom command to proceed to checkout with personal data
Cypress.Commands.add('checkoutWithPersonalData', (firstName, lastName, postalCode) => {
  cy.get('[data-test="checkout"]').should('be.visible').click();
  cy.url().should('include', '/checkout-step-one.html');
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.url().should('include', '/checkout-step-two.html');
});