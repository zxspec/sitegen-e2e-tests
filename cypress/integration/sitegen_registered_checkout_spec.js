describe('Registered user checkout', function(){
  beforeEach(() => {
    cy.openPDP();
    cy.startRegisteredCustomerCheckout();
    cy.addShippingAddress();
    cy.proceedToBillingPage();
    cy.addBillingAddress();      
  });

  it('has to open PDP, add product to a cart and pass checkout with a Credit Card', function(){
    // CC-fields
    cy.get('[name$=_creditCard_owner]').type('Test Testoff');
    cy.get('[name$=_creditCard_type]').select('Visa');
    cy.get('[name*=_creditCard_number]').type('4111111111111111');
    cy.get('[name$=_creditCard_expiration_month]').select('June');
    cy.get('[name$=_creditCard_expiration_year]').select('2020');
    cy.get('[name*=_creditCard_cvn]').type('123');

    cy.proceedToConfirmationPage();
    cy.validateThankYouPage();
  });

  it('has to open PDP, add product to a cart and pass checkout with PayPal', function(){    
    // select PayPal
    cy.get('#is-PayPal[type=radio]').click(); 
    
    cy.proceedToConfirmationPage();
    cy.validateThankYouPage();
  });

  it('has to open PDP, add product to a cart and pass checkout with PayPal', function(){    
    // select BML
    cy.get('#is-BML[type=radio]').click();    
    cy.get('[name$=_billing_paymentMethods_bml_year]').select('1970');
    cy.get('[name$=_billing_paymentMethods_bml_month]').select('1');
    cy.get('[name$=_billing_paymentMethods_bml_day]').select('1');
    cy.get('[name$=_billing_paymentMethods_bml_ssn]').clear().type('1234');
    cy.get('[name$=_billing_paymentMethods_bml_termsandconditions]').click();
    
    cy.proceedToConfirmationPage();
    cy.validateThankYouPage();
    cy.get('button.print-page');
  });
});
