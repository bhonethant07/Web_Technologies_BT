import React from 'react';
import ProfileCustomization from '../../src/components/ProfileCustomization';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/contexts/AuthContext';
import * as apiService from '../../src/services/api';

describe('Profile Customization Component', () => {
  beforeEach(() => {
    // Stub the API functions
    cy.stub(apiService, 'getUserProfile').resolves({
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        gratitude_goals: '',
        grateful_for: '',
        favorite_quote: '',
        how_gratitude_feels: '',
        profile_image: null
      },
      profile_completed: false
    }).as('getUserProfileStub');

    cy.stub(apiService, 'updateUserProfile').as('updateUserProfileStub');

    // Mock the context functions
    const updateProfileStatusMock = cy.stub().as('updateProfileStatusMock');
    const updateUserMock = cy.stub().as('updateUserMock');

    // Mount the component with mocked context
    cy.mount(
      <BrowserRouter>
        <AuthContext.Provider value={{
          updateProfileStatus: updateProfileStatusMock,
          updateUser: updateUserMock
        }}>
          <ProfileCustomization />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Wait for the loading state to finish
    cy.get('textarea[name="gratitude_goals"]').should('be.visible');
  });

  it('should render the profile customization form', () => {
    // Check that the form elements are rendered
    cy.contains('GRATITUDE GROVE').should('be.visible');
    cy.contains('Profile Customization').should('be.visible');
    cy.get('textarea[name="gratitude_goals"]').should('be.visible');
    cy.get('textarea[name="grateful_for"]').should('be.visible');
    cy.get('input[name="favorite_quote"]').should('be.visible');
    cy.get('textarea[name="how_gratitude_feels"]').should('be.visible');
    cy.contains('Upload Image').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Save Profile');
  });

  it('should update form fields when typing', () => {
    // Type in the gratitude goals field
    cy.get('textarea[name="gratitude_goals"]')
      .type('Practice mindfulness daily')
      .should('have.value', 'Practice mindfulness daily');

    // Type in the grateful for field
    cy.get('textarea[name="grateful_for"]')
      .type('Family, friends, and good health')
      .should('have.value', 'Family, friends, and good health');

    // Type in the favorite quote field
    cy.get('input[name="favorite_quote"]')
      .type('Gratitude turns what we have into enough')
      .should('have.value', 'Gratitude turns what we have into enough');

    // Type in the how gratitude feels field
    cy.get('textarea[name="how_gratitude_feels"]')
      .type('Peaceful and content')
      .should('have.value', 'Peaceful and content');
  });

  it('should show validation errors when submitting empty required fields', () => {
    // Submit the form without filling required fields
    cy.get('button[type="submit"]').click();

    // Check that validation errors are displayed
    cy.contains('Please share your gratitude goals').should('be.visible');
    cy.contains('Please share what you are grateful for').should('be.visible');
  });

  it('should have a skip button', () => {
    // Check that the skip button exists
    cy.contains('Skip for now').should('be.visible');
  });

  it('should allow clicking the upload image button', () => {
    // Check that the upload button exists and can be clicked
    cy.contains('Upload Image').click();

    // Check that the file input exists
    cy.get('input[type="file"]').should('exist');
  });

  it('should show submit button with correct text', () => {
    // Fill required fields
    cy.get('textarea[name="gratitude_goals"]').type('Practice mindfulness daily');
    cy.get('textarea[name="grateful_for"]').type('Family, friends, and good health');

    // Check that the submit button has the correct text
    cy.get('button[type="submit"]').should('contain', 'Save Profile');
  });
});
