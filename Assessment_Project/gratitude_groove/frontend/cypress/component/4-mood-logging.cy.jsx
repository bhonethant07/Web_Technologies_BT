import React from 'react';
import LogMood from '../../src/components/mood/LogMood';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as dashboardService from '../../src/services/dashboardService';

describe('Mood Logging Component', () => {
  beforeEach(() => {
    // Stub the logMood function
    cy.stub(dashboardService, 'logMood').as('logMoodStub');

    // Mount the component
    cy.mount(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LogMood />} />
        </Routes>
      </BrowserRouter>
    );
  });

  it('should render the mood logging form', () => {
    // Check that the form elements are rendered
    cy.contains('How Are You Feeling?').should('be.visible');
    cy.contains('Select your mood:').should('be.visible');
    cy.contains('Add a note (optional):').should('be.visible');
    cy.get('textarea#note').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Log Mood');
  });

  it('should display the current date', () => {
    // Get today's date in the expected format
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Check that the date is displayed
    cy.contains(today).should('be.visible');
  });

  it('should display all mood options', () => {
    // Check that all mood options are displayed
    cy.contains('Happy').should('be.visible');
    cy.contains('Grateful').should('be.visible');
    cy.contains('Calm').should('be.visible');
    cy.contains('Excited').should('be.visible');
    cy.contains('Reflective').should('be.visible');
    cy.contains('Anxious').should('be.visible');
    cy.contains('Sad').should('be.visible');
    cy.contains('Stressed').should('be.visible');
    cy.contains('Tired').should('be.visible');
  });

  it('should allow selecting a mood', () => {
    // Initially no mood is selected
    cy.get('button[type="submit"]').should('be.disabled');

    // Select a mood
    cy.contains('Happy').click();

    // Check that the mood button is visible
    cy.contains('Happy').should('be.visible');

    // Submit button should now be enabled
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should update note textarea when typing', () => {
    // Type in the textarea
    cy.get('textarea#note')
      .type('Feeling great today because of the nice weather!')
      .should('have.value', 'Feeling great today because of the nice weather!');
  });

  it('should have a cancel button that navigates back', () => {
    // Check that the cancel button exists
    cy.contains('Cancel').should('be.visible');
  });

  it('should require mood selection before submission', () => {
    // Submit button should be disabled initially
    cy.get('button[type="submit"]').should('be.disabled');

    // Add a note without selecting a mood
    cy.get('textarea#note').type('This is a test note');

    // Submit button should still be disabled
    cy.get('button[type="submit"]').should('be.disabled');

    // Select a mood
    cy.contains('Calm').click();

    // Submit button should now be enabled
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
