**DigiMart**

DigiMart is a location-based digital marketplace for buying and selling products locally.

Users can browse nearby listings, filter products by category and distance, view seller profiles and ratings, and later communicate directly through the platform.

**Tech Stack**

**Frontend**

React
TypeScript
Vite

**Backend**

NestJS
TypeScript
TypeORM
PostgreSQL


**Current Features**
Create and browse listings
Filter listings by title and category
Location-based search using latitude, longitude and radius
Default nearby search radius of 30 km
Seller profiles
User ratings
Premium listing expiration support
Planned Features
User registration and login
JWT authentication
Private messaging
Contact information for authenticated users
Listing images
Favorites
Premium listings
Payments
Pagination and sorting
React frontend
Docker and production deployment

**Project Structure**
digimart/
├── backend/
├── frontend/
├── database/
└── README.md

**Running the Backend**
cd backend
npm install
npm run start:dev

Create a .env file inside backend/:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=digimart

**The API runs at:**

http://localhost:3000
Status

**DigiMart is currently under active development.**

The goal is to turn it into a real-world local marketplace platform, not just a demo project.
