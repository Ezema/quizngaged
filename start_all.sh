#!/bin/bash

NPM_DIR="/home/notdebian/.nvm/versions/node/v20.11.0/lib/node_modules/npm/bin/npm-cli.js"

# Start the DB
docker-compose -f ./db/docker-compose.yml up -d

# Add Delay to wait for DB to start

# Start the backend (proxy + api)
cd backend; $NPM_DIR run servers;

# Start the Next.js server
cd ../frontend/; $NPM_DIR run dev;
