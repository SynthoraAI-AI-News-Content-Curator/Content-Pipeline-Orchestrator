# Backend Service

AI-powered backend API for the Content Pipeline Orchestrator.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication
- AI-powered article summarization (Google Gemini)
- Article Q&A with RAG
- Bias detection
- Vector similarity search
- Swagger API documentation

## Setup

```bash
npm install
cp ../.env.example ../.env
npm run dev
```

## API Endpoints

- `GET /api/articles` - List articles
- `GET /api/articles/:id` - Get article
- `POST /api/articles` - Create article (admin)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/articles/:id/qa` - Ask question about article
- `GET /api/articles/:id/related` - Get related articles

See full docs at `/api-docs`

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```
