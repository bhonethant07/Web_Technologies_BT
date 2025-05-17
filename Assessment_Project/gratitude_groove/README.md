# Gratitude Grove

A mindfulness and gratitude journaling web application built with Laravel 12 and React.

## Project Structure

- `/backend` - Laravel 12 API backend
- `/frontend` - React SPA frontend

## System Requirements

- **PHP**: 8.2 or higher (required for Laravel 12)
- **Composer**: Latest version
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **MySQL**: 8.0 or higher (or SQLite for development)

## Quick Start Guide

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Copy environment file and generate key
cp .env.example .env
php artisan key:generate

# Configure your database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306 or your port
# DB_DATABASE=your_db_name
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations and seeders
php artisan migrate --seed

# if not upload the provided sql file to your database and use the following login information
# Login information for admin user:
# email: tester@gmail.com
# password: test@2025
# Login information for user:
# email: test@gmail.com
# password: test@2025

# Create storage link for file uploads
php artisan storage:link

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Start the server
php artisan serve