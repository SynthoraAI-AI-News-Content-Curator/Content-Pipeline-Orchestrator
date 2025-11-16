# Agentic AI Pipeline

Multi-agent AI pipeline built with LangGraph and LangChain for advanced content processing.

## Architecture

Assembly line architecture with specialized agents:

1. **Intake Node** - Validates input and initializes state
2. **Content Analyzer** - Extracts structure, entities, dates
3. **Summarizer** - Generates 150-200 word summaries
4. **Classifier** - Categorizes into 15+ topics
5. **Sentiment Analyzer** - Analyzes tone and objectivity
6. **Quality Checker** - Validates outputs with retry logic
7. **Output Node** - Returns final results

## Technology Stack

- **LangChain** - LLM framework
- **LangGraph** - State machine orchestration
- **Python 3.11+** - Modern Python with async
- **Redis** - State management
- **MongoDB** - Data persistence
- **FastMCP** - Model Context Protocol server

## Quick Start

```bash
cd agentic_ai
pip install -r requirements.txt
cp .env.example .env  # Configure API keys
python -m agentic_ai.mcp_server.server
```

## Programmatic Usage

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

print(f"Summary: {result['summary']}")
print(f"Topics: {result['topics']}")
print(f"Quality Score: {result['quality_score']}")
```

## Cloud Deployment

### AWS
```bash
cd aws
./deploy.sh production
```

### Azure
```bash
cd azure
./deploy.sh production
```

### Docker
```bash
docker-compose up -d
```

## Features

- Multi-agent orchestration with LangGraph
- Quality assurance with automatic retry
- MCP server for standardized AI interactions
- Production-ready logging and monitoring
- Cloud deployment configurations (AWS, Azure)
- Prometheus metrics and Grafana dashboards
