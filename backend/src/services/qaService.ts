import { GoogleGenerativeAI } from '@google/generative-ai';
import { IArticle } from '@models/Article';
import { logger } from '@utils/logger';

export const answerQuestion = async (article: IArticle, question: string): Promise<string> => {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `You are ArticleIQ, an AI assistant specialized in answering questions about articles. Based on the following article, answer the user's question concisely and accurately.

Article Title: ${article.title}
Article Content:
${article.content.substring(0, 8000)}

User Question: ${question}

Provide a clear, concise answer based solely on the information in the article. If the answer cannot be found in the article, say so.`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    logger.info(`Q&A completed for article ${article._id}`);
    return answer;
  } catch (error) {
    logger.error('Q&A service error:', error);
    throw new Error('Failed to answer question');
  }
};
