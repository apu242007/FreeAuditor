#!/bin/bash
# Simple launcher script for FreeAuditor
# Usage: ./run.sh [options]

echo "🚀 Starting FreeAuditor..."
echo ""

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed or not in PATH"
    exit 1
fi

# Run the application with provided arguments
# If no arguments provided, show help
if [ $# -eq 0 ]; then
    python main.py --help
else
    python main.py "$@"
fi