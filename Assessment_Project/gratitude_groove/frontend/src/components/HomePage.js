import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('features');

  // Features data
  const features = [
    {
      title: "Daily Gratitude Journal",
      description: "Record your thoughts and moments of gratitude with our easy-to-use journal. Add images to capture special moments.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      image: "/journal-screenshot.png"
    },
    {
      title: "Mood Tracking",
      description: "Track your daily moods and discover patterns with our beautiful calendar visualization. One entry per day helps build consistency.",
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "/mood-screenshot.png"
    },
    {
      title: "Guided Exercises",
      description: "Access a library of guided meditation videos to help you cultivate gratitude and mindfulness in your daily life.",
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "/exercise-screenshot.png"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Teacher",
      content: "Gratitude Grove has transformed my daily routine. Taking a few minutes each day to reflect on what I'm grateful for has significantly improved my outlook on life.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The mood tracking feature is brilliant! Being able to see patterns in my emotional state has helped me make positive changes to my daily habits.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      name: "Aisha Patel",
      role: "Healthcare Professional",
      content: "I recommend Gratitude Grove to all my patients dealing with stress and anxiety. The guided exercises are particularly helpful for beginners.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: "Improved Mental Well-being",
      description: "Regular gratitude practice has been shown to reduce stress, anxiety, and depression while increasing overall happiness.",
      icon: "💆‍♀️"
    },
    {
      title: "Better Sleep Quality",
      description: "Practicing gratitude before bed can help calm your mind and improve sleep quality and duration.",
      icon: "😴"
    },
    {
      title: "Enhanced Relationships",
      description: "Expressing gratitude strengthens relationships and fosters a positive social environment.",
      icon: "👫"
    },
    {
      title: "Increased Resilience",
      description: "Gratitude helps build mental resilience, making it easier to bounce back from challenges.",
      icon: "💪"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-green-600">GRATITUDE GROVE</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Cultivate <span className="text-green-600">Gratitude</span>, Grow <span className="text-green-600">Happiness</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Gratitude Grove helps you develop a daily practice of gratitude through journaling, mood tracking, and guided exercises.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link to="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition duration-300">
                Get Started
              </Link>
              <a href="#features" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshot */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="relative">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <img 
              src="/dashboard-screenshot.png" 
              alt="Gratitude Grove Dashboard" 
              className="w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1200x600/f9fafb/64748b?text=Gratitude+Grove+Dashboard";
              }}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-green-100 rounded-full p-6 shadow-lg">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features to Enhance Your Gratitude Practice
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to build a consistent gratitude habit and improve your well-being.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  activeTab === 'features'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'benefits'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  activeTab === 'testimonials'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Testimonials
              </button>
            </div>
          </div>

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 text-green-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                  </div>
                  <div className="mt-6 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x200/f3f4f6/64748b?text=${feature.title.replace(' ', '+')}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-green-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      className="h-12 w-12 rounded-full mr-4"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.svg";
                      }}
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Gratitude Grove Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Simple steps to build your gratitude practice
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-200 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative z-10">
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Create Your Account</h3>
                <p className="text-gray-600">Sign up for free and set up your personal profile to start your gratitude journey.</p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Daily Practice</h3>
                <p className="text-gray-600">Log your mood, write journal entries, and engage with guided exercises daily.</p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Track Your Progress</h3>
                <p className="text-gray-600">Review your mood patterns and journal entries to see how your gratitude practice is improving your well-being.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Start Your Gratitude Journey?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-green-100">
            Join thousands of users who have transformed their lives through daily gratitude practice.
          </p>
          <div className="mt-8">
            <Link to="/register" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10 transition duration-300">
              Sign Up for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Gratitude Grove</h3>
              <p className="text-gray-400">Cultivating gratitude and mindfulness for a happier, more fulfilled life.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Have questions or feedback? Reach out to us at support@gratitudegrove.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Gratitude Grove. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
