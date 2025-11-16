#!/usr/bin/env node

/**
 * aicc - Content Pipeline Orchestrator CLI
 * Unified command-line interface for managing the monorepo
 */

const { spawn } = require('child_process');
const path = require('path');

const commands = {
  // Workspace management
  dev: {
    description: 'Start all services in development mode',
    action: (service) => {
      if (service) {
        return runCommand(`npm run dev:${service}`);
      }
      return runCommand('npm run dev');
    },
  },
  build: {
    description: 'Build all services for production',
    action: (service) => {
      if (service) {
        return runCommand(`npm run build:${service}`);
      }
      return runCommand('npm run build');
    },
  },
  start: {
    description: 'Start all services in production mode',
    action: (service) => {
      if (service) {
        return runCommand(`npm run start:${service}`);
      }
      return runCommand('npm run start');
    },
  },
  lint: {
    description: 'Format all code with Prettier',
    action: () => runCommand('npm run lint'),
  },
  format: {
    description: 'Alias for lint',
    action: () => runCommand('npm run lint'),
  },

  // Crawling
  crawl: {
    description: 'Run crawler job',
    action: () => runCommand('cd crawler && npm run crawl'),
  },

  // Article CRUD
  article: {
    description: 'Article management commands',
    action: async (subcommand, ...args) => {
      const API_URL = process.env.AICC_API_URL || 'http://localhost:3000';

      switch (subcommand) {
        case 'create':
          return createArticle(API_URL, parseArgs(args));
        case 'get':
          return getArticle(API_URL, args[0]);
        case 'list':
          return listArticles(API_URL, parseArgs(args));
        case 'update':
          return updateArticle(API_URL, args[0], parseArgs(args.slice(1)));
        case 'delete':
          return deleteArticle(API_URL, args[0]);
        default:
          console.log('Usage: aicc article <create|get|list|update|delete> [options]');
      }
    },
  },
};

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { shell: true, stdio: 'inherit' });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[i + 1];
      parsed[key] = value;
      i++;
    }
  }
  return parsed;
}

async function createArticle(apiUrl, options) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${apiUrl}/api/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

async function getArticle(apiUrl, id) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${apiUrl}/api/articles/${id}`);
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

async function listArticles(apiUrl, options) {
  const fetch = (await import('node-fetch')).default;
  const query = new URLSearchParams(options).toString();
  const response = await fetch(`${apiUrl}/api/articles?${query}`);
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

async function updateArticle(apiUrl, id, options) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${apiUrl}/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

async function deleteArticle(apiUrl, id) {
  const fetch = (await import('node-fetch')).default;
  await fetch(`${apiUrl}/api/articles/${id}`, { method: 'DELETE' });
  console.log(`Article ${id} deleted`);
}

function showHelp() {
  console.log('aicc - Content Pipeline Orchestrator CLI\n');
  console.log('Usage: aicc <command> [options]\n');
  console.log('Commands:');
  Object.entries(commands).forEach(([name, { description }]) => {
    console.log(`  ${name.padEnd(15)} ${description}`);
  });
}

// Main
const [, , command, ...args] = process.argv;

if (!command || command === 'help') {
  showHelp();
} else if (commands[command]) {
  commands[command].action(...args).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
} else {
  console.error(`Unknown command: ${command}`);
  showHelp();
  process.exit(1);
}
