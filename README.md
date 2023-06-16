# FileChonk
FileChonk allows you to browse and download files from an Amazon S3 bucket. It provides a user-friendly file tree interface powered by the Chonky and Chonky-Icon-Fontawesome npm packages.

## Features
- Browse files and folders in an Amazon S3 bucket
- Download files from an Amazon S3 bucket
- Auto-reload of both frontend and backend when files change.
- AWS SDK for JavaScript v3 integration for seamless S3 interactions.
- Express server with logging and error handling.
- Customizable through environment variables.
- Dockerized for easy deployment.

# Usage

## Pre-requisites
- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation
1. Clone the repository
    ```bash
    git clone https://github.com/Dev-29/filechonk.git
    cd filechonk
    ```
2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Create a .env file and add the following
    ```bash
    AWS_REGION=YOUR_AWS_REGION
    S3_BUCKET_NAME=YOUR_S3_BUCKET_NAME
    AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
    ```


4. Configuration:
- Open your browser and navigate to `http://localhost:9000` (or the specified port number).
- You should see the FileChonk interface, allowing you to browse and download files from your S3 bucket.


## Run dockerized version
1. Build the frontend Docker image
    ```bash
    cd frontend
    docker build -t filechonk-frontend .
    ```
2. Build the backend Docker image
    ```bash
    cd ../backend
    docker build -t filechonk-backend .
    ```
3. Run the docker image
    ```bash
    docker run -d -p 3000:3000 --name filechonk-backend filechonk-backend

    docker run -d -p 9000:9000 --name filechonk-frontend filechonk-frontend
    ```
4. Configuration:
- Open your browser and navigate to `http://localhost:9000` (or the specified port number).
- You should see the FileChonk interface, allowing you to browse and download files from your S3 bucket.

