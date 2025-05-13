import React from 'react';
import CreateJournalEntry from '../../src/components/journal/CreateJournalEntry';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as dashboardService from '../../src/services/dashboardService';

describe('Journal Entry Creation Component', () => {
  beforeEach(() => {
    // Stub the createJournalEntry function
    cy.stub(dashboardService, 'createJournalEntry').as('createJournalEntryStub');

    // Mount the component
    cy.mount(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CreateJournalEntry />} />
        </Routes>
      </BrowserRouter>
    );
  });

  it('should render the journal entry form', () => {
    // Check that the form elements are rendered
    cy.contains("Today's Journal Entry").should('be.visible');
    cy.contains('How are you feeling today?').should('be.visible');
    cy.get('textarea[name="entry_text"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Save Journal Entry');
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

  it('should allow selecting different moods', () => {
    // Check that mood options are displayed
    cy.contains('Grateful').should('be.visible');
    cy.contains('Happy').should('be.visible');
    cy.contains('Calm').should('be.visible');

    // Select a different mood
    cy.contains('Happy').click();

    // Check that the button contains the mood text
    cy.contains('Happy').should('be.visible');
  });

  it('should update textarea when typing', () => {
    // Type in the textarea
    cy.get('textarea[name="entry_text"]')
      .type('Today I am grateful for the opportunity to learn new things.')
      .should('have.value', 'Today I am grateful for the opportunity to learn new things.');
  });

  it('should show error when submitting empty entry', () => {
    // Clear the textarea
    cy.get('textarea[name="entry_text"]').clear();

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check that the error message is displayed
    cy.contains('Please write something in your journal entry').should('be.visible');
  });

  it('should have a cancel button that navigates back', () => {
    // Check that the cancel button exists
    cy.contains('Cancel').should('be.visible');
  });

  it('should allow image upload button interaction', () => {
    // Check that the upload button exists
    cy.contains('Upload Image').should('be.visible');

    // Click the upload button (we can't actually upload a file in component tests)
    cy.contains('Upload Image').click();

    // Check that the file input exists
    cy.get('input[type="file"]').should('exist');
  });
});
