import React from 'react';
import Login from '../../src/components/Login';
import { AuthContext } from '../../src/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Login Component', () => {
  beforeEach(() => {
    // Create a mock for the login function
    const loginMock = cy.stub().as('loginMock');

    // Mock localStorage
    cy.stub(window.localStorage, 'setItem').as('localStorageSetItem');

    // Mount the component with mocked context
    cy.mount(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: loginMock }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });

  it('should render the login form', () => {
    // Check that the form elements are rendered
    cy.contains('GRATITUDE GROVE').should('be.visible');
    cy.contains('User Login').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Log In');
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    // Password should be hidden by default
    cy.get('input#password').should('have.attr', 'type', 'password');

    // Click the toggle button
    cy.get('button[aria-label="Show password"]').click();

    // Password should now be visible
    cy.get('input#password').should('have.attr', 'type', 'text');

    // Click the toggle button again
    cy.get('button[aria-label="Hide password"]').click();

    // Password should be hidden again
    cy.get('input#password').should('have.attr', 'type', 'password');
  });

  it('should update input values when typing', () => {
    // Type in the email field
    cy.get('input#email')
      .type('test@example.com')
      .should('have.value', 'test@example.com');

    // Type in the password field
    cy.get('input#password')
      .type('password123')
      .should('have.value', 'password123');
  });

  it('should toggle remember me checkbox', () => {
    // Checkbox should be unchecked by default
    cy.get('input#remember-me').should('not.be.checked');

    // Click the checkbox
    cy.get('input#remember-me').click();

    // Checkbox should now be checked
    cy.get('input#remember-me').should('be.checked');

    // Click the checkbox again
    cy.get('input#remember-me').click();

    // Checkbox should be unchecked again
    cy.get('input#remember-me').should('not.be.checked');
  });

  it('should have a link to the registration page', () => {
    cy.contains('Register here')
      .should('have.attr', 'href', '/register');
  });

  it('should have a link to the forgot password page', () => {
    cy.contains('Forgot password?')
      .should('have.attr', 'href', '/forgot-password');
  });

  it('should validate form inputs', () => {
    // Try to submit the form without filling it
    cy.get('button[type="submit"]').click();

    // Check that HTML5 validation prevents submission
    cy.get('input#email:invalid').should('exist');
  });
});
