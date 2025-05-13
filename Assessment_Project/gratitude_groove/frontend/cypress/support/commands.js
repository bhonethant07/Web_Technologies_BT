// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login without UI
Cypress.Commands.add('login', (email, password) => {
  // Intercept the login API call
  cy.intercept('POST', '**/api/login', {
    statusCode: 200,
    body: {
      token: 'fake-token-123',
      user: {
        id: 1,
        name: 'Test User',
        email: email || 'test@example.com',
        role: 'user',
        profile_image_url: null,
        gratitude_goals: 'Practice mindfulness daily',
        grateful_for: 'Family, friends, and good health',
        favorite_quote: 'Gratitude turns what we have into enough',
        how_gratitude_feels: 'Peaceful and content'
      }
    }
  }).as('loginRequest');

  // Store the token in localStorage as your app would do
  localStorage.setItem('token', 'fake-token-123');
  localStorage.setItem('user', JSON.stringify({
    id: 1,
    name: 'Test User',
    email: email || 'test@example.com',
    role: 'user'
  }));
});

// Custom command to stub dashboard data
Cypress.Commands.add('stubDashboardData', () => {
  cy.intercept('GET', '**/api/dashboard', {
    statusCode: 200,
    body: {
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        profile_image_url: null
      },
      recent_entries: [
        {
          id: 1,
          entry_text: 'Today I am grateful for the opportunity to learn new things.',
          mood: 'Grateful',
          created_at: new Date().toISOString()
        }
      ],
      recent_moods: [
        {
          id: 1,
          mood: 'Happy',
          created_at: new Date().toISOString()
        }
      ],
      daily_prompt: {
        id: 1,
        prompt_text: 'What are three things you are grateful for today?'
      },
      stats: {
        total_entries: 5,
        total_mood_logs: 7,
        current_streak: 3
      },
      today: {
        has_entry: false,
        has_mood_log: false
      },
      exercises: [
        {
          id: 1,
          title: 'Deep Breathing Exercise',
          description: 'A simple yet powerful exercise to calm your mind and reduce stress.'
        }
      ]
    }
  }).as('dashboardRequest');
});

// Custom command to stub journal entries
Cypress.Commands.add('stubJournalEntries', () => {
  cy.intercept('GET', '**/api/journal', {
    statusCode: 200,
    body: [
      {
        id: 1,
        entry_text: 'Today I am grateful for the opportunity to learn new things.',
        mood: 'Grateful',
        created_at: new Date().toISOString()
      }
    ]
  }).as('journalEntriesRequest');
});

// Custom command to stub exercises
Cypress.Commands.add('stubExercises', () => {
  cy.intercept('GET', '**/api/exercises', {
    statusCode: 200,
    body: [
      {
        id: 1,
        title: 'Deep Breathing Exercise',
        description: 'A simple yet powerful exercise to calm your mind and reduce stress.',
        audio_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        id: 2,
        title: 'Gratitude Meditation',
        description: 'Focus on things you are grateful for to cultivate a positive mindset.',
        audio_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  }).as('exercisesRequest');
});
