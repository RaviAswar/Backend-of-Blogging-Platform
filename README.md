# Backend-of-Blogging-Platform
For running this code we have to put command in terminal "npm run dev"

Blogging Platform
Approach to Solve the Problem Statement
Backend (Node.js/Express)
RESTful API: Designed endpoints following REST conventions

Authentication: JWT-based auth with protected routes

Database: MySQL with Sequelize ORM for data modeling

Validation: Input validation for both API and database layers

Error Handling: Middleware for consistent error responses

Database (MySQL)
Relationships: Proper table relationships (Users ↔ Posts)

Migrations: Sequelize for schema management

Indexing: Added indexes for frequently queried fields

AI Assistance in Development
How I Used AI Tools:
Code Generation:

Used GitHub Copilot for boilerplate code (component structures, API routes)

Generated sample database schemas with ChatGPT

Debugging Assistance:

Diagnosed "Cannot read properties of undefined" errors with AI help

Fixed CKEditor integration issues with AI suggestions

Code Optimization:

Improved React performance with AI-recommended optimizations

Enhanced error handling patterns

Documentation:

Generated initial README structure

Created code comments and JSDocs

Learning:

Explained complex concepts (JWT auth, Sequelize associations)

Suggested modern React patterns

Setup Instructions
Backend Setup
Clone the repository:

bash
git clone [backend-repo-url]
cd server
Install dependencies:

bash
npm install
Configure environment:

Create .env file:

DB_NAME=blog_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your-secret-key
PORT=5000
Database setup:

bash
mysql -u root -p
CREATE DATABASE blog_db;
exit
Run migrations:

bash
npx sequelize-cli db:migrate
Start server:

bash
npm run dev

Development Scripts
Backend
npm run dev: Start development server

npm test: Run tests

npx sequelize-cli db:migrate: Run migrations

Project Structure
Backend
server/
├── config/       # Database configuration
├── controllers/  # Route controllers
├── middlewares/  # Custom middleware
├── models/       # Database models
├── routes/       # API routes
├── app.js        # Main application
└── package.json
