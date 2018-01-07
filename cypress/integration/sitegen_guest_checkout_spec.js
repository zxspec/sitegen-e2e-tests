describe('Guest checkout', function(){
  beforeEach(() => {
    // *** PDP ***
    cy.visit('https://production.sitegenesis.dw.demandware.net/s/SiteGenesis/charcoal-flat-front-athletic-fit-shadow-striped-wool-suit/640188017003.html');
    cy.get('#add-to-cart').click();
    cy.get('.mini-cart-link-cart').click();

    // *** CART ***
    cy.get('form#checkout-form button[name$=_checkoutCart]:first').click();

    // *** CHECKOUT STEP 1 ***
    cy.get('button[name$=_unregistered]').click();

    // *** CHECKOUT STEP 2 - Shipping ***
    // Shipping Address
    cy.get('[name$=_firstName]').clear().type('Test');
    cy.get('[name$=_lastName]').clear().type('Testoff');
    cy.get('[name$=_address1]').clear().type('1 main str');
    cy.get('[name$=_city]').clear().type('San Jose');
    cy.get('[name$=_postal]').clear().type('95136');
    cy.get('[name$=_states_state]').select('CA');
    cy.get('[name$=_phone]').clear().type('555-555-5555');
        
    cy.get('form[id$=_shippingAddress] button[type=submit]').should('not.be.disabled').click();
    
    // *** CHECKOUT STEP 3 ***
    // Billing Address
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

  it('has to open PDP, add product to a cart and pass checkout with a Credit Card', function(){  
    // CC-fields
    cy.get('[name$=_creditCard_owner]').type('Test Testoff');
    cy.get('[name$=_creditCard_type]').select('Visa');
    cy.get('[name*=_creditCard_number]').type('4111111111111111');
    cy.get('[name$=_creditCard_expiration_month]').select('June');
    cy.get('[name$=_creditCard_expiration_year]').select('2020');
    cy.get('[name*=_creditCard_cvn]').type('123');

    // *** CHECKOUT STEP 4 - Confirmation ***
    cy.get('form[id$=_billing] button[type=submit][name$=_billing_save]').should('not.be.disabled').click();
    
    cy.get('form[action*=orderconfirmation] button[type=submit]').should('not.be.disabled').click();

    // *** CHECKOUT STEP 5 - Thank You ***
    cy.url().should('include', '/orderconfirmation');
  });

  it('has to open PDP, add product to a cart and pass checkout with PayPal', function(){
    // select PayPal
    cy.get('#is-PayPal[type=radio]').click();    

    // *** CHECKOUT STEP 4 - Confirmation ***
    cy.get('form[id$=_billing] button[type=submit][name$=_billing_save]').should('not.be.disabled').click();
    
    cy.get('form[action*=orderconfirmation] button[type=submit]').should('not.be.disabled').click();

    // *** CHECKOUT STEP 5 - Thank You ***
    cy.url().should('include', '/orderconfirmation');
  });  

  it('has to open PDP, add product to a cart and pass checkout with "Bill Me Later"', function(){
    // select BML
    cy.get('#is-BML[type=radio]').click();    
    cy.get('[name$=_billing_paymentMethods_bml_year]').select('1970');
    cy.get('[name$=_billing_paymentMethods_bml_month]').select('1');
    cy.get('[name$=_billing_paymentMethods_bml_day]').select('1');
    cy.get('[name$=_billing_paymentMethods_bml_ssn]').clear().type('1234');
    cy.get('[name$=_billing_paymentMethods_bml_termsandconditions]').click();

    // *** CHECKOUT STEP 4 - Confirmation ***
    cy.get('form[id$=_billing] button[type=submit][name$=_billing_save]').should('not.be.disabled').click();
    
    cy.get('form[action*=orderconfirmation] button[type=submit]').should('not.be.disabled').click();

    // *** CHECKOUT STEP 5 - Thank You ***
    cy.url().should('include', '/orderconfirmation');
  });  
});
