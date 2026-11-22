#!/bin/bash
echo "========================================================"
echo "  Initializing BugSence Server and Local Database..."
echo "========================================================"

# Change directory to the script's directory (USB relative path)
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "========================================================"
    echo "  ERROR: Node.js is not installed on this system!"
    echo "  Please install Node.js (https://nodejs.org) to run."
    echo "========================================================"
    read -p "Press Enter to exit..."
    exit 1
fi

# Auto-install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "[USB] node_modules folder not found. Installing dependencies..."
    npm install
fi

echo "Starting local server and database..."
node server.js &
SERVER_PID=$!

echo "Waiting for database connection..."
sleep 3

echo "Launching BugSence in your browser..."
# Launch browser based on OS type
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8000 || sensible-browser http://localhost:8000 || echo "Please open http://localhost:8000 in your browser manually."
else
    echo "Please open http://localhost:8000 in your browser manually."
fi

# Wait for server to keep script alive if not run in background, or just exit and let it run
# To make it cleanly exit but leave node running in background, we just exit.
exit 0
