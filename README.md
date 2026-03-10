# FestiveEdge - Festival Cashback & Discounts Platform

FestiveEdge is a production-ready web platform that lists festival cashback offers and discounts from various banks in Bangladesh. Users can explore different banks and see the specific cashback or discount offers they provide during festivals.

## Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- React Router
- Axios
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API

## Project Structure

```
FestiveEdge/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # API logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Main entry point
│   └── seeder.js        # Data seeding script
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.jsx      # Main app & routing
│   │   └── index.css    # Global styles
│   └── ...
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or URI)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set up your `.env` file with `MONGO_URI`. Default is `mongodb://localhost:27017/festive-edge`.
4. Seed the database with sample data:
   ```bash
   node seeder.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   *Note: Ensure you have `nodemon` installed or use `node server.js`.*

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/banks` | GET | List all banks (supports search & filter) |
| `/api/banks/:id` | GET | Get single bank details with offers |
| `/api/banks` | POST | Create a new bank (Admin) |
| `/api/banks/:id` | DELETE | Delete a bank and its offers (Admin) |
| `/api/offers` | POST | Add an offer to a bank (Admin) |
| `/api/offers/:bankId` | GET | Get offers for a specific bank |

## Key Features
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Search & Filter:** Search by bank name or description. Filter by category.
- **Modern UI:** Glassmorphism, smooth transitions, and premium aesthetics.
- **Rich Details:** Detailed offer conditions and payment channel support.
