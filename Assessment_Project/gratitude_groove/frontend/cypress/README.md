# Cypress Component Tests for Gratitude Grove Frontend

This directory contains Cypress component tests for the Gratitude Grove frontend application. These tests are designed to test React components in isolation without requiring the backend to be active.

## Test Files

1. **Login Component Tests** (`1-login.cy.jsx`)
   - **Basic rendering**: Verifies that all form elements are rendered correctly
   - **Password visibility toggle**: Tests that clicking the eye icon toggles password visibility
   - **Input value updates**: Verifies that typing in fields updates their values
   - **Remember me checkbox**: Tests that the checkbox can be toggled
   - **Navigation links**: Verifies that links point to the correct pages
   - **Form validation**: Tests that HTML5 validation prevents empty form submission

2. **Registration Component Tests** (`2-registration.cy.jsx`)
   - **Basic rendering**: Verifies that all form elements are rendered correctly
   - **Password visibility toggle**: Tests that clicking the eye icon toggles password visibility
   - **Input value updates**: Verifies that typing in fields updates their values
   - **Form validation**: Tests that HTML5 validation prevents empty form submission
   - **Password matching**: Tests that an error is shown when passwords don't match
   - **Navigation links**: Verifies that links point to the correct pages

3. **Journal Entry Component Tests** (`3-journal-entry.cy.jsx`)
   - **Basic rendering**: Verifies that all form elements are rendered correctly
   - **Date display**: Tests that the current date is displayed
   - **Mood selection**: Tests that moods can be selected
   - **Text input**: Verifies that typing in the textarea updates its value
   - **Form validation**: Tests that an error is shown when submitting an empty entry
   - **Navigation**: Tests that the cancel button is present
   - **Image upload**: Tests that the image upload button works

4. **Mood Logging Component Tests** (`4-mood-logging.cy.jsx`)
   - **Basic rendering**: Verifies that all form elements are rendered correctly
   - **Date display**: Tests that the current date is displayed
   - **Mood options**: Tests that all mood options are displayed
   - **Mood selection**: Tests that moods can be selected and the submit button is enabled
   - **Text input**: Verifies that typing in the note textarea updates its value
   - **Navigation**: Tests that the cancel button is present
   - **Form validation**: Tests that the submit button is disabled until a mood is selected

5. **Profile Customization Component Tests** (`5-profile-customization.cy.jsx`)
   - **Basic rendering**: Verifies that all form elements are rendered correctly
   - **Form input**: Tests that typing in fields updates their values
   - **Form validation**: Tests that errors are shown when required fields are empty
   - **Navigation**: Tests that the skip button is present
   - **Image upload**: Tests that the image upload button works
   - **Submit button**: Tests that the submit button has the correct text

6. **Dashboard Component Tests** (`6-dashboard.cy.jsx`)
   - **Basic rendering**: Verifies that the component renders without crashing

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
