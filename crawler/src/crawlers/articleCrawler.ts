import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { logger } from '../utils/logger';

export interface ArticleData {
  title: string;
  url: string;
  content: string;
  source: string;
  author?: string;
  publishedAt?: Date;
  imageUrl?: string;
}

export class ArticleCrawler {
  private maxRetries = 3;

  async crawlUrl(url: string, source: string): Promise<ArticleData | null> {
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        // Try Axios + Cheerio first (faster)
        const result = await this.crawlWithAxios(url, source);
        if (result) return result;

        // Fallback to Puppeteer for dynamic content
        return await this.crawlWithPuppeteer(url, source);
      } catch (error: any) {
        logger.warn(`Crawl attempt ${attempt + 1} failed for ${url}:`, error.message);

        if (attempt === this.maxRetries - 1) {
          logger.error(`All crawl attempts failed for ${url}`);
          return null;
        }

        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    return null;
  }

  private async crawlWithAxios(url: string, source: string): Promise<ArticleData | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ContentCurator/1.0)',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);

      // Extract article data (basic implementation)
      const title = $('h1').first().text().trim() || $('title').text().trim();
      const content = $('article').text().trim() || $('main').text().trim() || $('body').text().trim();
      const imageUrl = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');

      if (!title || !content) {
        return null;
      }

      return {
        title,
        url,
        content: content.substring(0, 20000),
        source,
        imageUrl,
      };
    } catch (error) {
      throw error;
    }
  }

  private async crawlWithPuppeteer(url: string, source: string): Promise<ArticleData | null> {
    let browser;
    try {
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      const data = await page.evaluate(() => {
        const title = document.querySelector('h1')?.textContent || document.title;
        const article = document.querySelector('article') || document.querySelector('main');
        const content = article?.textContent || document.body.textContent || '';
        const imageUrl = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

        return { title, content, imageUrl };
      });

      await browser.close();

      if (!data.title || !data.content) {
        return null;
      }

      return {
        title: data.title.trim(),
        url,
        content: data.content.trim().substring(0, 20000),
        source,
        imageUrl: data.imageUrl || undefined,
      };
    } catch (error) {
      if (browser) await browser.close();
      throw error;
    }
  }
}
