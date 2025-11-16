# Contributing to Content Pipeline Orchestrator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Format](#commit-message-format)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read and follow it in all your interactions with the project.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Content-Pipeline-Orchestrator.git
   cd Content-Pipeline-Orchestrator
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, maintainable code
   - Follow the project's coding standards
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test              # Run all tests
   npm run lint          # Check code formatting
   npm run type-check    # TypeScript type checking
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

## Pull Request Process

1. **PR Title**: Use a descriptive title following the format:
   ```
   <type>(<scope>): <description>

   Examples:
   feat(backend): add article rating endpoint
   fix(crawler): handle 403 errors correctly
   docs(readme): update installation instructions
   ```

2. **PR Description**: Include:
   - Summary of changes
   - Motivation and context
   - Screenshots (if UI changes)
   - Related issues (if any)
   - Checklist of completed tasks

3. **Code Review**:
   - Address all review comments
   - Update your branch with main if needed
   - Ensure all CI checks pass

4. **Merge**:
   - Squash commits if requested
   - Delete your feature branch after merge

## Coding Standards

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Prefer functional programming patterns
- Use async/await over promises
- Handle errors appropriately

```typescript
// Good
async function fetchArticle(id: string): Promise<Article> {
  try {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  } catch (error) {
    logger.error('Failed to fetch article:', error);
    throw error;
  }
}

// Bad
function fetchArticle(id) {
  return Article.findById(id)
    .then(article => article)
    .catch(err => console.log(err));
}
```

### Python

- Follow PEP 8
- Use type hints
- Write docstrings for functions
- Use async/await for I/O operations

```python
# Good
async def process_article(article: Dict[str, Any]) -> Dict[str, Any]:
    """
    Process an article through the AI pipeline.

    Args:
        article: Dictionary containing article data

    Returns:
        Processed article with AI-generated metadata
    """
    result = await pipeline.process(article)
    return result
```

### React/Next.js

- Use functional components
- Use TypeScript for props
- Implement proper error boundaries
- Use React hooks appropriately
- Keep components small and focused

```tsx
// Good
interface ArticleCardProps {
  article: Article;
  onFavorite: (id: string) => void;
}

export function ArticleCard({ article, onFavorite }: ArticleCardProps) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <button onClick={() => onFavorite(article.id)}>
        Favorite
      </button>
    </div>
  );
}
```

## Testing Guidelines

### Backend Tests

```typescript
describe('Article API', () => {
  it('should create a new article', async () => {
    const response = await request(app)
      .post('/api/articles')
      .send({
        title: 'Test Article',
        content: 'Test content',
        source: 'test',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });
});
```

### Frontend E2E Tests

```typescript
test('should display article list', async ({ page }) => {
  await page.goto('/articles');

  const articles = await page.locator('.article-card');
  await expect(articles).toHaveCount(10);
});
```

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat(backend): add article rating endpoint

Implement POST /api/articles/:id/rate endpoint
Add rating validation and average calculation
Update Article model with ratings array

Closes #123
```

```
fix(crawler): handle 403 errors with retry logic

Add exponential backoff for 403 responses
Implement Puppeteer fallback for blocked requests
```

## Documentation

- Update README.md for new features
- Add JSDoc/TSDoc comments for functions
- Update API documentation (Swagger)
- Create/update architecture diagrams if needed
- Document breaking changes

## Questions?

If you have questions, feel free to:
- Open an issue
- Join our discussions
- Contact the maintainers

Thank you for contributing! 🚀
