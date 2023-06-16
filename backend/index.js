require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
const port = process.env.PORT || 3000;

// Disable ETag caching
app.disable('etag');

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 's3-file-browser-ngrok' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true,
    colorize: true,
  })
);

// Root endpoint (/)
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// List files endpoint (/files/:prefix)
app.get('/files/:prefix', async (req, res) => {
  const prefix = req.params.prefix || '';

  try {
    const data = await listFiles(prefix);
    res.json(data);
  } catch (error) {
    logger.error('Error listing files:', error);
    res.sendStatus(500);
  }
});

// Download file endpoint (/download/:key)
app.get('/download/:key', async (req, res) => {
  const key = req.params.key;

  try {
    const fileStream = await downloadFile(key);
    res.attachment(key);
    fileStream.pipe(res);
  } catch (error) {
    logger.error('Error downloading file:', error);
    res.sendStatus(500);
  }
});

// Function to list files in the S3 bucket
const listFiles = (prefix) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: prefix,
  };

  return s3
    .listObjectsV2(params)
    .promise()
    .then((data) => {
      const files = data.Contents.map((file) => ({
        id: file.Key,
        name: file.Key.split('/').pop(),
        isDir: file.Key.endsWith('/'),
      }));

      return files;
    });
};

// Function to download a file from the S3 bucket
const downloadFile = (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  return s3.getObject(params).createReadStream();
};

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
