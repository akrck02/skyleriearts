#!/bin/bash

# Declare the necessary variables
DEPLOY_PATH=/home/fuyu/services/nginx/prod/skyleriearts

# check if node_modules exists
# if not, install
if [ ! -d "node_modules" ]; then
    echo ">> node_modules does not exist, installing"
    npm install
fi

# check if the deploy path exists if not raise an error
if [ ! -d $DEPLOY_PATH ]; then
    echo ">> Deploy path [$DEPLOY_PATH] does not exist"
    exit 1
fi

# Create a production build
echo ">> Creating production build"
npm run dist

# Copy the necessary files to the deploy path
# this is an nfs mount to the nginx server
echo ">> Deploying to $DEPLOY_PATH"
cp ./{favicon.ico,gtdf.config.json,index.html,out,app/index.html,app/out,resources,version.json} $DEPLOY_PATH
