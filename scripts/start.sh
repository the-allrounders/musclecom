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
    curl -sL https://deb.nodesource.com/setup_9.x | sudo bash -
    sudo apt-get install -y nodejs
    echo "ℹ️ Installing done... node version is $(node -v)"
fi

echo ""
echo ""

if service --status-all | grep -Fq 'mongodb'; then
  echo "✅ Mongo is already installed."
  echo "ℹ️ Your mongodb version information:"
  mongod --version
else
    echo "ℹ️ Mongodb not yet installed, installing.."
    sudo apt-get install -y mongodb-server
fi

echo ""
echo ""

echo "Starting mongo service.."

sudo service mongodb start

echo ""
echo ""

echo "ℹ️ Installing yarn / checking for updates"
sudo npm install --global yarn@0

echo ""
echo ""

echo "ℹ️ Installing dependencies"
cd ..
yarn install

echo ""
echo ""

echo "ℹ️ Starting application"
yarn start-prod
