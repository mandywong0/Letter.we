# Letter.we

Letter.we is a cozy messenger app designed to simulate the tradition of sending handwritten letters by mail. Users can write letters, add a “stamp” to make them ready to mail, and track incoming letters in real-time. It's made for any two people who want to nurture their special connection through this thoughtful, intentional practice of exchanging messages.

## Live Demo
### Check out the live app here: 
Frontend: https://letter-we.onrender.com/
Backend API: https://letter-we-backend.onrender.com

## Features
- **Handwritten-inspired messaging** — Send messages in the style of letters & mail rather than instant texts.  
- **One-to-one connections** — Each user can pair with only one partner, creating a dedicated space for your connection.
- **Daily reading ritual** — Letters can only be read on the day they’re sent, encouraging presence and consistency.  
- **Real time inbox** — New letters appear instantly in a mailbox shaped inbox, giving users immediate notifications powered by WebSockets.
- **Private & secure** — All messages are kept just between you and your recipient.

## Tech Stack
- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (hosted on Neon)
- **Real time Communication**: Socket.IO
- **Deployment**: Render

## Setup Instructions
### Backend
1. Clone the repository:
```
git clone https://github.com/mandywong0/Letter.we.git
cd Letter.we
```
2. Install dependencies:
```
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```
3. Create environment files:
Example .env (development)
```
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://myname@localhost:5432/xxx_db
REACT_APP_API_URL=http://localhost:4000
JWT_SECRET=your_jwt_secret_here
```
4. Run the backend:
```
# From server folder
npm run dev       # for development with nodemon
npm start         # for production
```
5. Run the frontend:
```
# From client folder
npm run dev
```
