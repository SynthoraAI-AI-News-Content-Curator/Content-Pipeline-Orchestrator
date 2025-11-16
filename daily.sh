#!/bin/bash

# Daily automation script for Content Pipeline Orchestrator
# Runs crawler, processes articles, and sends newsletter

set -e

LOG_FILE="daily.log"

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting daily automation..."

# 1. Run crawler
log "Running crawler..."
cd crawler
npm run crawl || log "Crawler failed"
cd ..

# 2. Sync vectors to Pinecone
if [ -f "./sync_vectors.sh" ]; then
    log "Syncing vectors..."
    ./sync_vectors.sh || log "Vector sync failed"
fi

# 3. Send newsletter
log "Sending newsletter..."
cd newsletters
npm run send || log "Newsletter send failed"
cd ..

# 4. Cleanup
log "Cleaning up..."
find . -name "*.tmp" -delete
find . -name "*.bak" -delete

log "Daily automation complete!"
