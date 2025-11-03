# PulseSquare 

### Discover Local Services. Connect. Review. Thrive.

PulseSquare is a community-driven MERN web platform that helps people discover services and products in towns they visit — with reviews, ratings, and trusted listings.
Service providers can showcase their businesses, gain visibility, and even feature their listings through paid promotion.

 Coming soon...

 Table of Contents

About

PulseSquare connects service seekers and local providers on one platform.
It gives users verified reviews and ratings, while providers can list their services and promote them through paid features.

The platform is built to support local economies, digital visibility, and community trust.

Features
User Roles

Client (Service Seeker):
Search, view, and review services.

Provider (Service Owner):
Add services or products, wait for admin approval, and pay to feature listings.

Admin:
Approves listings, manages payments, and monitors platform activity.

Core Functions

User authentication (JWT)

Role-based dashboards

Add, edit, and approve listings

Review and rating system

Paid featured services

Search and filter by location or category

Admin management panel

Tech Stack

Frontend: React.js, Axios, TailwindCSS, React Router
Backend: Node.js, Express.js, Mongoose
Database: MongoDB Atlas
Authentication: JWT + bcrypt
Image Storage: Cloudinary
Payments (Future): M-Pesa API or Stripe
Deployment: Vercel (frontend) + Render (backend)

Architecture
Client (React) <----> REST API (Express) <----> Database (MongoDB)


Frontend sends API requests to the backend.

Backend verifies and processes data

Database stores users, services, and reviews.

Admin has elevated control through protected routes.
