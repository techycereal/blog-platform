// File: /app/api/createpost/route.js
import { NextResponse } from 'next/server';
import { connect } from '../../lib/databaseUtil';
import { BlobServiceClient } from '@azure/storage-blob';
import crypto from 'crypto';
import 'dotenv/config'; // Use ES module syntax for dotenv
import path from 'path';
import fs from 'fs';

// Use environment variables for sensitive information
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=eventsystemstorage;AccountKey=/L8kHg212CbCeJ9xywkusmSA+REW4OzWixOEvHnoRhxDldvlbFofqXpA7VkkIdbZfJWuIy0CmyJD+ASt4lxf9g==;EndpointSuffix=core.windows.net';
const containerName = 'blogs'; // Replace with your container name

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Upload file to Azure Blob Storage
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

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();
    
    const title = formData.get('title');
    const content = formData.get('content');
    const ownerName = formData.get('ownerName'); // Assuming ownerName is passed
    const owner = formData.get('owner'); // Assuming owner is passed
    const file = formData.get('file');

    // Initialize file URL variable
    let fileUrl = null;

    // Process the file if it exists
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer
      const fileName = file.name;
      
      // Use a temporary path for the file
      const tempDir = path.join(process.cwd(), '/tmp/uploads');
      
      // Create the directory if it does not exist
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      const tempFilePath = path.join(tempDir, fileName);
      fs.writeFileSync(tempFilePath, fileBuffer); // Save buffer to temp file

      // Upload file to Azure Blob Storage
      fileUrl = await uploadFileToBlob(tempFilePath, fileName);
      
      // Optionally, you can delete the file from the temp directory after upload
      fs.unlinkSync(tempFilePath);
    }

    const database = await connect('posts');

    // Insert the post with the current timestamp
    await database.collection('post').insertOne({
      ownerName,
      title,
      content,
      owner,
      time: new Date(), // Add the current date and time as the time field
      fileUrl // Save file URL from Azure Blob Storage
    });

    return NextResponse.json({ data: 'success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while creating the post.' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
