# SynthoraAI - Content Pipeline Orchestrator

> **Synthesizing the world's news & information through AI** 🚀✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://www.docker.com/)

A comprehensive, AI-powered **Content Pipeline Orchestrator** designed to aggregate, summarize, and present curated articles for government officials and public users. This monorepo, multi-service architecture integrates cutting-edge AI technologies with modern web frameworks to deliver up-to-date, concise, and relevant content.

## 🌟 Overview

The **Content Pipeline Orchestrator** is an end-to-end solution that combines:

- **Advanced AI Processing**: Google Generative AI, LangChain, and LangGraph for sophisticated content analysis
- **Automated Content Aggregation**: Intelligent crawlers for government sources and news outlets
- **Modern Web Architecture**: Next.js, Express.js, and MongoDB for scalable data management
- **Multi-Agent AI Pipeline**: LangGraph-based agentic system for advanced content processing
- **Real-time Updates**: Scheduled cron jobs and serverless functions for fresh content
- **User Engagement**: Newsletter subscriptions, article ratings, comments, and recommendations

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Services](#-services)
  - [Backend](#backend-service)
  - [Crawler](#crawler-service)
  - [Frontend](#frontend-service)
  - [Newsletter](#newsletter-service)
  - [Agentic AI Pipeline](#agentic-ai-pipeline)
- [CLI Tools](#-cli-tools)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Capabilities

- **🤖 AI-Powered Summarization**: Leverages Google Generative AI (Gemini) to generate concise, accurate article summaries
- **📰 Automated Content Crawling**: Multi-source article aggregation from government sites and news APIs
- **🔍 Intelligent Search & Discovery**: Vector similarity search using Pinecone for finding related articles
- **📧 Newsletter Subscriptions**: Daily email updates with the latest curated content
- **👤 User Authentication**: JWT-based secure authentication with favorites and personalized features
- **💬 Engagement Features**: Comments, ratings, discussions, and upvote/downvote functionality
- **🎯 Bias Detection**: AI-powered analysis for article bias and objectivity
- **🤔 Article Q&A**: RAG-based question-answering system for article content
- **📊 Recommendations**: Dual-layer recommendation engine (vector similarity + client-side ML)
- **🌙 Dark Mode**: Full dark/light mode support for improved readability
- **📱 Responsive Design**: Mobile-first, responsive UI for all devices

### Advanced AI Features

- **Multi-Agent Processing**: LangGraph orchestration with specialized agents for:
  - Content analysis and entity extraction
  - Summarization and classification
  - Sentiment analysis and tone detection
  - Quality assurance with automatic retry logic
- **MCP Server**: Model Context Protocol server for standardized AI interactions
- **Cloud-Ready**: Production configurations for AWS Lambda and Azure Functions

## 🏗️ Architecture

The system follows a **microservices architecture** with five main components:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Content Pipeline Orchestrator                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
    ┌─────▼─────┐           ┌──────▼──────┐         ┌────────▼────────┐
    │  Crawler  │           │   Backend   │         │    Frontend     │
    │  Service  │──────────▶│   Service   │◀────────│    Service      │
    └───────────┘           └─────────────┘         └─────────────────┘
          │                         │
          │                  ┌──────▼──────┐
          │                  │  Newsletter │
          └─────────────────▶│   Service   │
                             └─────────────┘
                                    │
                             ┌──────▼──────┐
                             │  Agentic AI │
                             │   Pipeline  │
                             └─────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
    ┌─────▼─────┐           ┌──────▼──────┐         ┌────────▼────────┐
    │  MongoDB  │           │    Redis    │         │    Pinecone     │
    └───────────┘           └─────────────┘         └─────────────────┘
```

### Data Flow

1. **Crawler** → Fetches articles from government sources and news APIs
2. **Backend** → Processes articles with AI summarization and stores in MongoDB
3. **Agentic AI** → Advanced multi-agent processing for deep content analysis
4. **Frontend** → Displays curated content with search, filters, and user features
5. **Newsletter** → Sends daily updates to subscribers via email

## 🛠️ Technology Stack

### Backend & API
- **Node.js** (v18+) - Runtime environment
- **Express.js** - RESTful API framework
- **Next.js** - Full-stack React framework
- **MongoDB** + **Mongoose** - Database and ODM
- **Redis** - Caching and session management
- **JWT** - Authentication and authorization

### Frontend
- **Next.js 14** - React framework with SSG/SSR
- **React** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components

### AI & Machine Learning
- **Google Generative AI** (Gemini) - Content summarization
- **LangChain** - LLM application framework
- **LangGraph** - Multi-agent orchestration
- **Pinecone** - Vector database for similarity search
- **OpenAI** (optional) - Alternative LLM provider

### Crawling & Automation
- **Axios** - HTTP client
- **Cheerio** - HTML parsing
- **Puppeteer** - Headless browser automation
- **Playwright** - E2E testing framework

### DevOps & Deployment
- **Docker** + **Docker Compose** - Containerization
- **Vercel** - Serverless deployment platform
- **AWS** (Lambda, S3, SQS) - Cloud infrastructure
- **Azure** (Functions, Blob Storage) - Alternative cloud
- **GitHub Actions** - CI/CD automation
- **Prometheus** + **Grafana** - Monitoring and visualization

### Email & Communication
- **Resend** - Email delivery service
- **Nodemailer** - Email sending library

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Python** >= 3.11 (for Agentic AI)
- **MongoDB** (local or Atlas)
- **Redis** (optional, for caching)
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SynthoraAI-AI-News-Content-Curator/Content-Pipeline-Orchestrator.git
   cd Content-Pipeline-Orchestrator
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start all services in development mode**
   ```bash
   npm run dev
   ```

   Or start individual services:
   ```bash
   npm run dev:backend    # Backend on http://localhost:3000
   npm run dev:frontend   # Frontend on http://localhost:3001
   npm run dev:crawler    # Crawler on http://localhost:3002
   npm run dev:newsletter # Newsletter on http://localhost:3003
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/api-docs

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📁 Project Structure

```
Content-Pipeline-Orchestrator/
├── backend/                 # Backend API service
│   ├── src/
│   │   ├── api/            # API routes and controllers
│   │   ├── models/         # MongoDB models
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Utility functions
│   ├── tests/              # Backend tests
│   ├── Dockerfile
│   └── package.json
├── crawler/                # Article crawler service
│   ├── src/
│   │   ├── crawlers/       # Crawler implementations
│   │   ├── parsers/        # HTML/content parsers
│   │   └── schedulers/     # Cron job schedulers
│   ├── scripts/            # Utility scripts
│   ├── Dockerfile
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles/        # CSS and styling
│   ├── public/            # Static assets
│   ├── tests/             # E2E tests
│   ├── Dockerfile
│   └── package.json
├── newsletters/           # Newsletter service
│   ├── src/
│   │   ├── templates/    # Email templates
│   │   ├── services/     # Email sending logic
│   │   └── schedulers/   # Cron schedulers
│   ├── Dockerfile
│   └── package.json
├── agentic_ai/           # Multi-agent AI pipeline
│   ├── core/             # Core pipeline logic
│   ├── agents/           # Specialized AI agents
│   ├── mcp_server/       # MCP server implementation
│   ├── aws/              # AWS deployment configs
│   ├── azure/            # Azure deployment configs
│   ├── requirements.txt
│   └── README.md
├── bin/                  # CLI tools
│   └── aicc.js          # Main CLI entry point
├── scripts/              # Automation scripts
│   ├── daily.sh
│   ├── sync_vectors.sh
│   └── install_daily_cron.sh
├── monitoring/           # Monitoring configs
│   ├── prometheus.yml
│   └── grafana/
├── .github/
│   └── workflows/       # GitHub Actions CI/CD
├── docker-compose.yml
├── Makefile
├── package.json
└── README.md
```

## 🎯 Services

### Backend Service

**Location**: `backend/`
**Port**: 3000
**Live**: https://ai-content-curator-backend.vercel.app/

**Features**:
- RESTful API for article CRUD operations
- AI-powered summarization with Google Gemini
- User authentication with JWT
- Article favorites and ratings
- Comment and discussion system
- Bias detection and analysis
- Scheduled content updates via cron

**Key Endpoints**:
```
GET    /api/articles           # List articles (paginated)
GET    /api/articles/:id       # Get article details
POST   /api/articles           # Create article (admin)
PUT    /api/articles/:id       # Update article (admin)
DELETE /api/articles/:id       # Delete article (admin)
POST   /api/auth/register      # User registration
POST   /api/auth/login         # User login
POST   /api/articles/:id/qa    # Article Q&A
GET    /api/articles/:id/related  # Related articles
```

### Crawler Service

**Location**: `crawler/`
**Port**: 3001
**Live**: https://ai-content-curator-crawler.vercel.app

**Features**:
- Automated article extraction from multiple sources
- Fallback to Puppeteer for dynamic content
- Retry logic with exponential backoff
- Scheduled daily runs (6:00 AM & 6:00 PM UTC)
- Past article fetching capability

**Run Commands**:
```bash
npm run crawl          # Run crawler once
npm run fetch:past     # Fetch historical articles
npm run fetch:latest   # Fetch latest articles only
```

### Frontend Service

**Location**: `frontend/`
**Port**: 3002
**Live**: https://synthoraai.vercel.app/

**Features**:
- Modern, responsive UI with Next.js 14
- User authentication and profile management
- Article browsing with pagination and filters
- Favorite articles and reading lists
- Comment system with upvote/downvote
- Article Q&A chatbot (ArticleIQ)
- Related articles recommendations
- Dark/light mode toggle
- Newsletter subscription

**Pages**:
- `/` - Landing page with hero and latest articles
- `/articles` - Article listing with filters
- `/articles/[id]` - Article detail with Q&A
- `/favorites` - User's favorite articles (auth required)
- `/profile` - User profile and settings
- `/newsletter` - Newsletter subscription

### Newsletter Service

**Location**: `newsletters/`
**Port**: 3003
**Live**: https://ai-content-curator-newsletters.vercel.app

**Features**:
- Email subscription management
- Daily newsletter delivery (9:00 AM UTC)
- Responsive email templates
- Unsubscribe functionality
- Integration with Resend API

**Setup**:
1. Sign up for Resend account
2. Add and verify your domain
3. Configure DNS records (TXT, MX, SPF, DKIM)
4. Set `RESEND_API_KEY` in `.env`
5. Deploy and configure cron

### Agentic AI Pipeline

**Location**: `agentic_ai/`
**Port**: 8000

**Features**:
- Multi-agent architecture with LangGraph
- Specialized agents for content analysis, summarization, classification, sentiment analysis
- Quality assurance with automatic retry
- MCP server for standardized AI interactions
- Cloud deployment ready (AWS, Azure)
- Comprehensive monitoring and logging

**Agents**:
1. **Content Analyzer** - Extracts structure, entities, and key information
2. **Summarizer** - Generates concise summaries (150-200 words)
3. **Classifier** - Categorizes into 15+ topic categories
4. **Sentiment Analyzer** - Analyzes tone, objectivity, urgency
5. **Quality Checker** - Validates outputs with retry logic

**Usage**:
```python
from agentic_ai.core.pipeline import AgenticPipeline
import asyncio

pipeline = AgenticPipeline()
result = await pipeline.process_article({
    "id": "article-123",
    "content": "Article content...",
    "url": "https://example.com",
    "source": "government"
})
```

See full documentation: [agentic_ai/README.md](agentic_ai/README.md)

## 🔧 CLI Tools

The `aicc` command provides a unified interface for managing the entire monorepo:

### Installation
```bash
npm install
npm link
```

### Commands

**Workspace Management**:
```bash
aicc dev                    # Start all services in dev mode
aicc dev backend            # Start backend only
aicc build                  # Build all services
aicc start                  # Start all in production
aicc lint                   # Format all code with Prettier
```

**Crawling**:
```bash
aicc crawl                  # Run crawler job
```

**Article CRUD**:
```bash
aicc article create --title "AI Trends" --content "..." --topics ai ml
aicc article get <id>
aicc article list --limit 10
aicc article update <id> --title "New Title"
aicc article delete <id>
```

## 🚢 Deployment

### Vercel (Recommended)

Each service can be deployed independently to Vercel:

```bash
# Backend
cd backend && vercel --prod

# Frontend
cd frontend && vercel --prod

# Crawler
cd crawler && vercel --prod

# Newsletter
cd newsletters && vercel --prod
```

**Environment Variables**: Configure in Vercel dashboard for each project

**Cron Jobs**: Configured in `vercel.json` for each service

### Docker

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### AWS

```bash
cd agentic_ai/aws
./deploy.sh production
```

### Azure

```bash
cd agentic_ai/azure
./deploy.sh production
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm ci
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
```

### Frontend E2E Tests
```bash
cd frontend
npm ci
npm run test:e2e          # Headless
npm run test:e2e:headed   # Headed mode
npm run test:e2e:report   # View report
```

### Crawler Tests
```bash
cd crawler
npm ci
npm run test
```

## 🔄 Automation Scripts

### Daily Script
Runs crawler, processes articles, and sends newsletter:
```bash
./daily.sh
```

### Install Cron Job
Sets up daily automation (4:00 PM UTC):
```bash
chmod +x install_daily_cron.sh
./install_daily_cron.sh
```

### Vector Sync
Syncs article embeddings to Pinecone:
```bash
./sync_vectors.sh
```

### Makefile
```bash
make help           # Show all targets
make bootstrap      # Install all dependencies
make dev:frontend   # Start frontend
make dev:backend    # Start backend
make clean          # Remove build artifacts
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Guidelines**:
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commits format

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Contact

**Project Team**: SynthoraAI
**Repository**: https://github.com/SynthoraAI-AI-News-Content-Curator/Content-Pipeline-Orchestrator

For questions or support, please open an issue or contact the maintainers.

---

**Built with ❤️ by the SynthoraAI Team**

*Synthesizing the world's news & information through AI* 🚀✨
