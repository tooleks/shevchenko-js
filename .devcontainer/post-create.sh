#!/bin/bash
set -e

echo "Setting up library dependencies..."
npm ci

# The site depends on the local library build ("shevchenko": "file:..").
echo "Building library..."
npm run build

echo "Setting up site dependencies..."
cd site
npm ci

echo "Setting up web API dependencies..."
cd ../docker
npm ci

echo "Post-create setup complete!"
