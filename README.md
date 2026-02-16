# Authentication System

A production-ready authentication system with React frontend and Node.js backend.

## Features

- User registration and login
- Email verification with OTP
- Password reset functionality
- JWT authentication with access and refresh tokens
- Secure httpOnly cookies
- Rate limiting and security middleware
- Responsive UI with Tailwind CSS

## Project Structure

```
/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── .env              # Environment variables
└── README.md         # This file
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- SendGrid account for email sending

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Environment Setup

1. Copy the `.env` file and update the values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret for JWT tokens
   - `JWT_REFRESH_SECRET`: A different secret for refresh tokens
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `EMAIL_FROM`: The email address to send from

## Running the Application

### Backend

```bash
cd backend
npm run dev
```

The backend will run on http://localhost:5000

### Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP

### User
- `GET /api/user/profile` - Get user profile (protected)

## Security Features

- Password hashing with bcrypt
- JWT tokens with expiration
- httpOnly cookies for token storage
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with express-validator

## Development

- Frontend uses React Hook Form for form handling
- Axios for API calls
- React Hot Toast for notifications
- Tailwind CSS for styling
- Backend uses Express with middleware for security
