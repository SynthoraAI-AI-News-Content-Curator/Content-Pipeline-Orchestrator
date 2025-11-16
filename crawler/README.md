# Crawler Service

Automated article crawler for the Content Pipeline Orchestrator.

## Features

- Axios + Cheerio for static content
- Puppeteer fallback for dynamic content
- Retry logic with exponential backoff
- Scheduled cron execution
- Multiple source support

## Usage

```bash
npm install
npm run crawl              # Run once
npm run fetch:past         # Fetch historical articles
npm run fetch:latest       # Fetch latest articles
```

## Configuration

Set `CRAWL_URLS` in `.env`:

```
CRAWL_URLS=https://www.state.gov/press-releases/,https://www.bbc.com/news
```

## Deployment

Deploy to Vercel with cron:

```bash
vercel --prod
```
