# PulseSquare

### _Discover trusted local services anywhere — powered by community reviews._

---

## Overview

**PulseSquare** is a MERN-based platform that helps users find reliable local services when traveling or moving to new places. It centralizes scattered information so users can easily search, compare, and review local businesses — especially those that are not listed online.

---

## Problem

People struggle to discover trusted services because:

- Online info is scattered and unreliable
- Word-of-mouth recommendations are inconsistent
- Small-town businesses often don’t exist online at all

---

## Solution

PulseSquare solves this by letting users:

- Search for services (e.g., "best barber near me")
- Read verified ratings & reviews
- Add new businesses to the platform
- Access location, price ranges, and contact details instantly

---

## Tech Stack

### **Frontend**

- React
- TailwindCSS / Material UI
- Axios
- React Router

### **Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### **Deployment**

- Backend → Render / Railway
- Frontend → Vercel / Netlify
- Database → MongoDB Atlas

---

## Core Features (MVP)

- Service search (name, category, location)
- Business listing pages with filters
- Business profile pages with details + map/location
- User reviews & ratings system
- Add new businesses
- (Optional) User authentication for posting reviews

---

## Project Structure

```
PulseSquare/
│
├── client/            # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/            # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### **Businesses**

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/businesses`     | Get all / search businesses |
| GET    | `/api/businesses/:id` | Get single business         |
| POST   | `/api/businesses`     | Add new business            |

### **Reviews**

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/api/businesses/:id/reviews` | Get reviews for a business |
| POST   | `/api/businesses/:id/review`  | Add a review               |

### **Auth**

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

## Installation & Setup

### **1. Clone repo**

```bash
git clone https://github.com/your-username/pulsesquare.git
cd pulsesquare
```

### **2. Install client dependencies**

```bash
cd client
npm install
```

### **3. Install server dependencies**

```bash
cd ../server
npm install
```

### **4. Create a `.env` file inside `/server`**

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### **5. Start development servers**

#### Client:

```bash
cd client
npm start
```

#### Server:

```bash
cd server
npm run dev
```

---

## Deployment

### **Backend (Render / Railway)**

1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### **Frontend (Vercel / Netlify)**

1. Import client folder
2. Set API base URL in `.env`
3. Build & deploy

---

## 🤝 Contributing

Contributions, issues, and ideas are welcome!
Fork the repo → Create a branch → Submit a PR.

---

## 🛡 License

Distributed under the MIT License.
