const defaultPdpUrl = 'https://sitegenesis.demandware.net/640188017003.html';

Cypress.Commands.add('openPDP', (url = defaultPdpUrl) => {
    cy.visit(url);
    cy.get('#add-to-cart').click();
    cy.get('.mini-cart-link-cart').click();
});

Cypress.Commands.add('startGuestCheckout', () => {      
    cy.get('form#checkout-form button[name$=_checkoutCart]:first').click();
    cy.get('button[name$=_unregistered]').click();
});

Cypress.Commands.add('startRegisteredCustomerCheckout', () => {      
    cy.get('form#checkout-form button[name$=_checkoutCart]:first').click();
    cy.get('[name*=_login_username]').clear().type('ievlevdmitriy@gmail.com');
    cy.get('[name*=_login_password]').clear().type('ievlevdmitriy@gmail.com');
    cy.get('button[type=submit][name$=_login]').click();
});

Cypress.Commands.add('addShippingAddress', () => {
    cy.get('[name$=_firstName]').clear().type('Test');
    cy.get('[name$=_lastName]').clear().type('Testoff');
    cy.get('[name$=_address1]').clear().type('1 main str');
    cy.get('[name$=_city]').clear().type('San Jose');
    cy.get('[name$=_postal]').clear().type('95136');
    cy.get('[name$=_states_state]').select('CA');
    cy.get('[name$=_phone]').clear().type('555-555-5555');
});

Cypress.Commands.add('proceedToBillingPage', () => {
    cy.get('form[id$=_shippingAddress] button[type=submit]').should('not.be.disabled').click();
});

Cypress.Commands.add('addBillingAddress', () => {    
    cy.get('[name$=_firstName]').clear().type('John');
    cy.get('[name$=_lastName]').clear().type('Doe');
    cy.get('[name$=_address1]').clear().type('1 Market St');
    cy.get('[name$=_address2]').clear().type('Suite 300');
    cy.get('[name$=_city]').clear().type('San Francisco');
    cy.get('[name$=_postal]').clear().type('94105');
    cy.get('[name$=_states_state]').select('CA');
    cy.get('[name$=_phone]').clear().type('415-901-7000');
    cy.get('[name$=_emailAddress]').clear().type('user@example.com');
});

Cypress.Commands.add('proceedToConfirmationPage', () => {
    cy.get('form[id$=_billing] button[type=submit][name$=_billing_save]').should('not.be.disabled').click();    
    cy.get('form[action*=orderconfirmation] button[type=submit]').should('not.be.disabled').click();
});

Cypress.Commands.add('validateThankYouPage', () => {
    cy.url().should('include', '/orderconfirmation');
});
