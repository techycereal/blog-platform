// File: lib/azureBlobService.js
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import crypto from 'crypto';
import 'dotenv/config'; // Use ES module syntax for dotenv

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; // Use environment variable
const containerName = 'blogs'; // Replace with your container name

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

export const uploadFileToBlob = async (filePath, originalName) => {
  const blobName = `${crypto.randomBytes(16).toString('hex')}-${originalName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadFile(filePath);
    return blockBlobClient.url; // Return the URL of the uploaded blob
  } catch (error) {
    throw new Error(`Error uploading file to Blob Storage: ${error.message}`);
  }
};
