import mongoose from 'mongoose';
import { ArticleCrawler } from '../crawlers/articleCrawler';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const CRAWL_URLS = (process.env.CRAWL_URLS || '').split(',').filter(Boolean);

async function fetchAndSummarize() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/content-curator');
    logger.info('Connected to MongoDB');

    const crawler = new ArticleCrawler();
    let successCount = 0;
    let failureCount = 0;

    for (const url of CRAWL_URLS) {
      try {
        logger.info(`Crawling: ${url}`);
        const source = new URL(url).hostname.replace('www.', '');
        const articleData = await crawler.crawlUrl(url, source);

        if (articleData) {
          // Send to backend API for processing
          const response = await fetch(`${process.env.AICC_API_URL}/api/articles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articleData),
          });

          if (response.ok) {
            successCount++;
            logger.info(`Successfully processed: ${url}`);
          } else {
            failureCount++;
          }
        } else {
          failureCount++;
        }
      } catch (error: any) {
        logger.error(`Error processing ${url}:`, error.message);
        failureCount++;
      }
    }

    logger.info(`Crawl complete. Success: ${successCount}, Failures: ${failureCount}`);
  } catch (error) {
    logger.error('Fetch and summarize failed:', error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run if executed directly
if (require.main === module) {
  fetchAndSummarize()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default fetchAndSummarize;
