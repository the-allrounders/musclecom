#!/usr/bin/env bash

# Change to current directory
cd "$(dirname "$0")"

echo "Resetting git repository..."
git reset HEAD --hard

echo "Pulling git repository..."
git pull

echo ""
echo ""

if hash npm 2>/dev/null; then
    echo "✅ Node is already installed."
    echo "ℹ️ Your node version is $(node -v)"
else
    echo "ℹ️ Node.js is not installed yet, installing.."
    sudo apt-get install -y nodejs
fi

echo ""
echo ""

echo "ℹ️ Installing yarn / checking for updates"
npm install --global yarn@0

echo ""
echo ""

echo "ℹ️ Installing dependencies"
cd ..
yarn install

echo ""
echo ""

echo "ℹ️ Starting application"
yarn start-prod
