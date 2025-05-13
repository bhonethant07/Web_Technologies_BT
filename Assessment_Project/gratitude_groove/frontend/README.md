# Gratitude Grove Frontend

This is the frontend application for Gratitude Grove, a mindfulness and gratitude journaling platform. The application is built with React and includes features for journaling, mood tracking, guided exercises, and profile customization.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the Jest test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open:component`

Opens the Cypress Test Runner UI for component tests. This allows you to select and run individual component tests in an interactive browser environment.

### `npm run cypress:run:component`

Runs all Cypress component tests in headless mode and generates a report. This is useful for CI/CD pipelines or quick verification of all tests.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Component Testing

This project uses Cypress for component testing. The component tests are located in the `cypress/component` directory and are designed to test React components in isolation without requiring the backend to be active.

### Test Files

1. **Login Component Tests** (`1-login.cy.jsx`)
2. **Registration Component Tests** (`2-registration.cy.jsx`)
3. **Journal Entry Component Tests** (`3-journal-entry.cy.jsx`)
4. **Mood Logging Component Tests** (`4-mood-logging.cy.jsx`)
5. **Profile Customization Component Tests** (`5-profile-customization.cy.jsx`)
6. **Dashboard Component Tests** (`6-dashboard.cy.jsx`)

For more details about the component tests, see the [Cypress README](./cypress/README.md).

## Project Structure

The project is organized as follows:

- `src/components`: React components for the application
  - `admin`: Components for the admin dashboard
  - `dashboard`: Components for the user dashboard
  - `journal`: Components for journal entries
  - `mood`: Components for mood tracking
  - `exercises`: Components for guided exercises
- `src/contexts`: React context providers
- `src/services`: API service functions
- `cypress/component`: Cypress component tests

## Features

- **User Authentication**: Login, registration, and password management
- **Profile Customization**: User profile settings and preferences
- **Journal Entries**: Create, view, update, and delete journal entries
- **Mood Tracking**: Log daily moods and view mood trends
- **Guided Exercises**: Access mindfulness exercises with embedded videos
- **Dashboard**: Overview of recent activities and statistics

## Testing

This project uses two testing frameworks:

1. **Jest**: For unit testing React components and services
2. **Cypress**: For component testing in isolation

The Cypress component tests provide a more realistic testing environment by mounting actual React components and simulating user interactions.
