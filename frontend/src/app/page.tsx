import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SynthoraAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Synthesizing the world&apos;s news & information through AI 🚀✨
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/articles"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Articles
            </Link>
            <Link
              href="/newsletter"
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Subscribe
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">AI-Powered Summaries</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get concise, accurate summaries powered by Google Gemini
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover related content with vector similarity search
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Article Q&A</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ask questions and get instant answers about articles
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
