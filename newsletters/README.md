# Newsletter Service

Email newsletter service for daily article updates.

## Features

- Daily newsletter delivery
- Subscription management
- Resend API integration
- Responsive email templates
- Unsubscribe functionality

## Setup

1. Sign up for Resend account
2. Verify domain in Resend dashboard
3. Set environment variables:
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `RESEND_DOMAIN`

## Usage

```bash
npm install
npm run send  # Send newsletter
```

## Deployment

Deploy to Vercel with cron (9:00 AM UTC daily).
