# FestiveEdge Backend

This is the backend for the FestiveEdge platform, built with Node.js, Express, and MongoDB.

## Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or on Atlas)

## Database Setup

1. **Environment Variables**:
   Create a `.env` file in the `backend` directory (vía `.env.example`):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/festive-edge
   NODE_ENV=development
   ```

2. **Database Seeding**:
   Populate the database with initial bank, offer, and discount data:
   ```bash
   cd backend
   npm run seed
   ```

## API Endpoints

- `GET /api/banks` - Get all banks
- `GET /api/offers` - Get all offers (with filters for store, bank, festival)
- `GET /api/offers/bank/:bankId` - Get offers for a specific bank

## Core Models
- **Bank**: Title, Company, Category, Description
- **Offer**: Name, Store Name, Discount, Card Types, Festival, Expiry Date
