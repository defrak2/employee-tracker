# employee-tracker


employee-management-app/
│
├── db/
│   ├── connection.js        // File to establish connection to PostgreSQL database
│   ├── schema.sql           // SQL schema for creating database tables
│   ├── seeds.sql            // Optional: SQL seeds for initial data
│
├── lib/
│   ├── queries.js           // Functions for database queries (CRUD operations)
│   ├── prompts.js           // Inquirer prompts for user interactions
│
├── models/
│   ├── Department.js        // Department model definition
│   ├── Role.js              // Role model definition
│   ├── Employee.js          // Employee model definition
│
├── utils/
│   ├── formatter.js         // Utility functions for formatting data (e.g., tables)
│
├── index.js                 // Main entry point of the application
├── package.json             // npm package configuration
├── README.md                // Project documentation
├── walkthrough.mp4          // Video demonstration of the application