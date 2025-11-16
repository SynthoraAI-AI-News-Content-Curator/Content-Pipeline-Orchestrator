import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@utils/logger';

const API_KEYS = [
  process.env.GOOGLE_AI_API_KEY,
  process.env.GOOGLE_AI_API_KEY1,
  process.env.GOOGLE_AI_API_KEY2,
  process.env.GOOGLE_AI_API_KEY3,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

const getNextApiKey = (): string => {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
};

export const summarizeContent = async (
  content: string,
  maxRetries: number = 3
): Promise<string> => {
  const instructions =
    process.env.AI_INSTRUCTIONS || 'Summarize the following article concisely and naturally:';

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const apiKey = getNextApiKey();
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `${instructions}\n\n${content.substring(0, 10000)}`;
      const result = await model.generateContent(prompt);
      const summary = result.response.text();

      logger.info('Content summarized successfully');
      return summary;
    } catch (error: any) {
      logger.warn(`Summarization attempt ${attempt + 1} failed:`, error.message);

      if (attempt === maxRetries - 1) {
        logger.error('All summarization attempts failed');
        return content.substring(0, 500) + '...'; // Fallback to truncated content
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return content.substring(0, 500) + '...';
};

export const detectBias = async (content: string): Promise<{ score: number; analysis: string }> => {
  try {
    const apiKey = getNextApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Analyze the following article for bias. Rate the bias on a scale of 0-10 (0 being completely neutral, 10 being extremely biased). Provide a brief analysis explaining your rating.\n\nArticle:\n${content.substring(0, 5000)}\n\nRespond in JSON format: { "score": number, "analysis": string }`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return { score: 5, analysis: 'Unable to determine bias' };
  } catch (error) {
    logger.error('Bias detection failed:', error);
    return { score: 5, analysis: 'Bias detection unavailable' };
  }
};
