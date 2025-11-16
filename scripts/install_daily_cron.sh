#!/bin/bash

# Install cron job for daily automation

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CRON_SCRIPT="$PROJECT_ROOT/daily.sh"

# Ensure script is executable
chmod +x "$CRON_SCRIPT"

# Create cron job (runs daily at 16:00 UTC)
CRON_JOB="0 16 * * * cd $PROJECT_ROOT && $CRON_SCRIPT >> $PROJECT_ROOT/daily.log 2>&1"

# Check if cron job already exists
(crontab -l 2>/dev/null | grep -F "$CRON_SCRIPT") && {
    echo "Cron job already exists"
    exit 0
}

# Add cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job installed successfully!"
echo "Daily automation will run at 16:00 UTC (4:00 PM)"
echo ""
echo "To view your cron jobs:"
echo "  crontab -l"
echo ""
echo "To remove this cron job:"
echo "  crontab -e"
