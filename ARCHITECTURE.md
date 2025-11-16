# System Architecture

## Overview

The **Content Pipeline Orchestrator** follows a microservices architecture pattern, with each service operating independently while communicating through well-defined APIs and message queues.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Content Pipeline Orchestrator                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐         ┌────────────────────┐
│   Crawler Service    │────────▶│   Backend Service    │◀────────│  Frontend Service  │
│   (Article Fetch)    │         │   (API + AI)         │         │   (Next.js UI)     │
└──────────────────────┘         └──────────────────────┘         └────────────────────┘
         │                                 │                                 │
         │                                 │                                 │
         ▼                                 ▼                                 ▼
┌──────────────────────┐         ┌──────────────────────┐         ┌────────────────────┐
│ External News APIs   │         │   MongoDB Database   │         │   User Browser     │
│ • NewsAPI            │         │   • Articles         │         │   • Auth           │
│ • Government Sites   │         │   • Users            │         │   • Favorites      │
└──────────────────────┘         │   • Comments         │         │   • Comments       │
                                 └──────────────────────┘         └────────────────────┘
                                          │
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         │                                │                                │
         ▼                                ▼                                ▼
┌──────────────────────┐         ┌──────────────────────┐         ┌────────────────────┐
│ Newsletter Service   │         │  Agentic AI Pipeline │         │   Redis Cache      │
│ • Resend API         │         │  • LangGraph         │         │   • Sessions       │
│ • Email Templates    │         │  • Multi-Agent       │         │   • Rate Limits    │
└──────────────────────┘         └──────────────────────┘         └────────────────────┘
         │                                │
         │                                │
         ▼                                ▼
┌──────────────────────┐         ┌──────────────────────┐
│  Email Subscribers   │         │  Pinecone Vectors    │
│                      │         │  • Embeddings        │
└──────────────────────┘         │  • Similarity        │
                                 └──────────────────────┘
```

## Service Breakdown

### 1. Backend Service (Express.js + Next.js)

**Responsibilities:**
- RESTful API for CRUD operations
- User authentication (JWT)
- AI-powered summarization (Google Gemini)
- Bias detection and analysis
- Article Q&A (RAG)
- Rate limiting and caching

**Technology Stack:**
- Express.js for API routes
- Mongoose for MongoDB ODM
- JWT for authentication
- Google Generative AI for summarization
- Swagger for API documentation
- Winston for logging

**API Endpoints:**
```
/api/articles          # Article CRUD
/api/auth              # Authentication
/api/users             # User management
/api/articles/:id/qa   # Q&A feature
/api/articles/:id/related  # Related articles
```

**Deployment:**
- Vercel serverless functions
- Automatic scaling
- Cron jobs for scheduled tasks (6 AM & 6 PM UTC)

### 2. Crawler Service

**Responsibilities:**
- Web scraping from government sources
- API integration (NewsAPI, etc.)
- Content extraction and cleaning
- Error handling with retry logic
- Scheduled execution

**Technology Stack:**
- Axios for HTTP requests
- Cheerio for HTML parsing
- Puppeteer for dynamic content
- Exponential backoff for retries

**Crawl Sources:**
- state.gov/press-releases
- whitehouse.gov/briefing-room
- congress.gov
- BBC News, NYTimes, etc.

**Deployment:**
- Vercel cron (daily at 6 AM UTC)
- Docker container option

### 3. Frontend Service (Next.js 14)

**Responsibilities:**
- User interface for browsing articles
- Authentication UI
- Article detail pages with Q&A
- User favorites and profile
- Newsletter subscription
- Dark/light mode

**Technology Stack:**
- Next.js 14 with App Router
- React Server Components
- Tailwind CSS
- Shadcn UI components
- TypeScript

**Pages:**
- `/` - Landing page
- `/articles` - Article listing
- `/articles/[id]` - Article detail
- `/favorites` - User favorites
- `/profile` - User settings
- `/newsletter` - Subscription

**Deployment:**
- Vercel Edge Network
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

### 4. Newsletter Service

**Responsibilities:**
- Email subscription management
- Daily newsletter compilation
- Email delivery via Resend
- Unsubscribe handling

**Technology Stack:**
- Resend API for email delivery
- MongoDB for subscriber storage
- Handlebars for templates

**Deployment:**
- Vercel cron (daily at 9 AM UTC)

### 5. Agentic AI Pipeline (Python)

**Responsibilities:**
- Multi-agent content processing
- Advanced sentiment analysis
- Topic classification (15+ categories)
- Quality assurance
- Embedding generation

**Architecture:**
- Assembly line pattern
- 7 specialized agents
- LangGraph state machine
- Automatic retry on quality failure

**Agents:**
1. **Intake** - Input validation
2. **Content Analyzer** - Entity extraction
3. **Summarizer** - 150-200 word summaries
4. **Classifier** - Topic categorization
5. **Sentiment Analyzer** - Tone detection
6. **Quality Checker** - Output validation
7. **Output** - Result formatting

**Deployment:**
- Docker container
- AWS Lambda
- Azure Functions
- FastMCP server

## Data Flow

### Article Processing Pipeline

```
1. Crawler fetches article
   └─▶ Extract URL, title, content

2. Send to Backend API
   └─▶ POST /api/articles

3. Backend processes article
   ├─▶ AI Summarization (Google Gemini)
   ├─▶ Bias Detection
   ├─▶ Metadata extraction
   └─▶ Save to MongoDB

4. (Optional) Agentic AI processing
   ├─▶ Deep content analysis
   ├─▶ Advanced classification
   ├─▶ Sentiment analysis
   └─▶ Quality scoring

5. Vector embedding generation
   └─▶ Store in Pinecone for similarity search

6. Frontend displays article
   ├─▶ SSG/ISR for performance
   ├─▶ Related articles via vector search
   └─▶ Q&A available

7. Newsletter compilation
   └─▶ Daily digest email to subscribers
```

## Database Schema

### MongoDB Collections

**articles**
```javascript
{
  _id: ObjectId,
  title: String,
  url: String (unique),
  content: String,
  summary: String,
  source: String,
  author: String?,
  publishedAt: Date?,
  fetchedAt: Date,
  topics: [String],
  imageUrl: String?,
  bias: {
    score: Number (0-10),
    analysis: String,
    detectedAt: Date
  },
  ratings: [{
    userId: ObjectId,
    rating: Number (1-5),
    createdAt: Date
  }],
  averageRating: Number,
  viewCount: Number,
  embedding: [Number],
  metadata: {
    wordCount: Number,
    readingTime: Number,
    language: String
  },
  status: Enum ['pending', 'processed', 'published', 'archived'],
  createdAt: Date,
  updatedAt: Date
}
```

**users**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: Enum ['user', 'admin'],
  favorites: [ObjectId],
  preferences: {
    topics: [String],
    emailNotifications: Boolean,
    theme: Enum ['light', 'dark']
  },
  isEmailVerified: Boolean,
  lastLogin: Date?,
  createdAt: Date,
  updatedAt: Date
}
```

**comments**
```javascript
{
  _id: ObjectId,
  articleId: ObjectId,
  userId: ObjectId,
  content: String,
  upvotes: [ObjectId],
  downvotes: [ObjectId],
  score: Number,
  parentId: ObjectId?,
  replies: [ObjectId],
  isEdited: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Security

### Authentication & Authorization
- JWT tokens (7-day expiry)
- HTTP-only cookies
- Bcrypt password hashing (10 rounds)
- Role-based access control (RBAC)

### API Security
- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting (100 req/15 min)
- Input validation (Zod)
- SQL injection prevention (Mongoose)
- XSS protection

### Data Privacy
- GDPR compliance
- User data encryption
- Secure session management
- Newsletter unsubscribe

## Scalability

### Horizontal Scaling
- Stateless services
- Load balancing via Vercel
- Database connection pooling
- Redis caching layer

### Performance Optimization
- CDN for static assets
- Image optimization (Next.js)
- Lazy loading components
- API response caching
- Database indexing

### Monitoring
- Prometheus metrics
- Grafana dashboards
- Winston logging
- Sentry error tracking

## Deployment Strategy

### Development
```bash
make dev          # Run all services locally
docker-compose up # Containerized development
```

### Staging
- Automated deployment on PR merge
- Preview URLs via Vercel
- Integration testing

### Production
- Blue-green deployment
- Automatic rollback on failure
- Health checks
- Zero-downtime updates

## CI/CD Pipeline

```
Push to GitHub
  │
  ├─▶ Run linting (ESLint, Prettier)
  │
  ├─▶ Run tests (Jest, Playwright)
  │
  ├─▶ Build services
  │
  ├─▶ Deploy to Vercel (auto)
  │
  └─▶ Run smoke tests
```

## Disaster Recovery

### Backup Strategy
- Daily MongoDB backups
- 30-day retention
- Point-in-time recovery
- Automated restoration scripts

### High Availability
- Multi-region deployment option
- Database replication
- Failover mechanisms
- 99.9% uptime SLA

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live article updates
2. **Advanced Search**: Elasticsearch for full-text search
3. **Mobile Apps**: React Native iOS/Android apps
4. **GraphQL API**: Alternative to REST for flexible queries
5. **Multi-language**: i18n support for international users
6. **Voice Integration**: Alexa/Google Assistant skills
7. **Blockchain**: Content verification and provenance tracking

---

**Last Updated:** 2025-11-16
**Version:** 1.0.0
