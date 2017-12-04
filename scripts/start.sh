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

if hash mongod 2>/dev/null; then
    echo "✅ Mongo is already installed."
    echo "ℹ️ Your mongodb version information:"
    mongod --version
else
    echo "ℹ️ Mongodb not yet installed, installing.."
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
fi

echo ""
echo ""

echo "Starting mongo service.."

sudo service mongod start

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
