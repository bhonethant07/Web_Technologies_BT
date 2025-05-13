# Cypress Component Tests for Gratitude Grove Frontend

This directory contains Cypress component tests for the Gratitude Grove frontend application. These tests are designed to test React components in isolation without requiring the backend to be active.

## Test Files

1. **Login Component Tests** (`1-login.cy.jsx`)
   - Tests user login functionality
   - Validates form inputs
   - Tests password visibility toggle
   - Tests successful login and error handling
   - Tests redirection based on profile completion status

2. **Registration Component Tests** (`2-registration.cy.jsx`)
   - Tests user registration functionality
   - Validates form inputs
   - Tests password confirmation matching
   - Tests successful registration and error handling

3. **Journal Entry Component Tests** (`3-journal-entry.cy.jsx`)
   - Tests creating new journal entries
   - Tests mood selection
   - Tests form validation
   - Tests image upload functionality
   - Tests successful submission and error handling

4. **Mood Logging Component Tests** (`4-mood-logging.cy.jsx`)
   - Tests mood logging functionality
   - Tests mood selection
   - Tests form validation
   - Tests once-per-day limitation handling
   - Tests successful submission and error handling

5. **Profile Customization Component Tests** (`5-profile-customization.cy.jsx`)
   - Tests profile customization functionality
   - Tests form validation
   - Tests profile image upload
   - Tests loading existing profile data
   - Tests successful submission and error handling

6. **Dashboard Component Tests** (`6-dashboard.cy.jsx`)
   - Tests dashboard component rendering
   - Tests displaying user stats, journal entries, and exercises
   - Tests quick action buttons
   - Tests loading and error states

## Running the Tests

### Open Cypress Component Test Runner

```bash
npm run cypress:open -- --component
```

This will open the Cypress Test Runner UI where you can select and run individual component tests.

### Run All Component Tests Headlessly

```bash
npm run cypress:run -- --component
```

This will run all component tests in headless mode and generate a report.

## Test Approach

These tests use a component testing approach, which:

1. **Mounts React Components Directly**: Tests interact with the actual React components
2. **Stubs External Dependencies**: API calls and context providers are stubbed
3. **No Backend Required**: Tests run without needing the backend server
4. **Fast Execution**: Component tests run much faster than end-to-end tests
5. **Isolated Testing**: Each component is tested in isolation

## Benefits

- **Tests Real Components**: Tests your actual React components, not simulated HTML
- **No Backend Dependency**: Tests run without requiring the backend to be active
- **Fast Execution**: Component tests run quickly
- **Reliable Results**: Tests are isolated from external factors
- **Focused Testing**: Tests specifically verify component behavior

## Notes

- These tests focus on component functionality and user interactions
- API calls are stubbed to simulate backend responses
- Tests can run without the backend server being active
- The tests assume the React component structure matches the current implementation
