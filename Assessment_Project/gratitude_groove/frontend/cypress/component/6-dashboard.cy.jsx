import React from 'react';
import UserDashboard from '../../src/components/UserDashboard';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/contexts/AuthContext';

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Mock the logout function
    const logoutMock = cy.stub().as('logoutMock');

    // Mount the component with mocked context
    cy.mount(
      <BrowserRouter>
        <AuthContext.Provider value={{ logout: logoutMock }}>
          <UserDashboard />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });

  it('should render the dashboard component', () => {
    // Check that the component is rendered
    cy.get('div').should('exist');
  });
});
