import React from 'react';
import Register from '../../src/components/Register';
import { BrowserRouter } from 'react-router-dom';

describe('Registration Component', () => {
  beforeEach(() => {
    // Mock localStorage
    cy.stub(window.localStorage, 'setItem').as('localStorageSetItem');

    // Mount the component
    cy.mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it('should render the registration form', () => {
    // Check that the form elements are rendered
    cy.contains('GRATITUDE GROVE').should('be.visible');
    cy.contains('Create Account').should('be.visible');
    cy.get('input#name').should('be.visible');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('input#passwordConfirmation').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Register');
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    // Password should be hidden by default
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.get('input#passwordConfirmation').should('have.attr', 'type', 'password');

    // Click the toggle button
    cy.get('button[type="button"]').click();

    // Password should now be visible
    cy.get('input#password').should('have.attr', 'type', 'text');
    cy.get('input#passwordConfirmation').should('have.attr', 'type', 'text');

    // Click the toggle button again
    cy.get('button[type="button"]').click();

    // Password should be hidden again
    cy.get('input#password').should('have.attr', 'type', 'password');
    cy.get('input#passwordConfirmation').should('have.attr', 'type', 'password');
  });

  it('should update input values when typing', () => {
    // Type in the name field
    cy.get('input#name')
      .type('John Doe')
      .should('have.value', 'John Doe');

    // Type in the email field
    cy.get('input#email')
      .type('john@example.com')
      .should('have.value', 'john@example.com');

    // Type in the password field
    cy.get('input#password')
      .type('password123')
      .should('have.value', 'password123');

    // Type in the password confirmation field
    cy.get('input#passwordConfirmation')
      .type('password123')
      .should('have.value', 'password123');
  });

  it('should validate form inputs', () => {
    // Try to submit the form without filling it
    cy.get('button[type="submit"]').click();

    // Check that HTML5 validation prevents submission
    cy.get('input#name:invalid').should('exist');
  });

  it('should show error when passwords do not match', () => {
    // Fill the form with mismatched passwords
    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#passwordConfirmation').type('different123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check that the error message is displayed
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should have a link to the login page', () => {
    cy.contains('Login here')
      .should('have.attr', 'href', '/login');
  });
});
