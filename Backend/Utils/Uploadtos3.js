import s3 from "../Config/ConfigAWS.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File content
 * @param {string} fileName - Name of the file (with extension)
 * @param {string} folder - S3 folder name
 * @returns {string} file URL
 */
export const uploadToS3 = async (fileBuffer, fileName, folder) => {
  const Bucket = process.env.S3_BUCKET_NAME;
  const Key = folder ? `${folder}/${fileName}` : fileName;

  try {
    const params = {
      Bucket,
      Key,
      Body: fileBuffer,
    //   ACL: "public-read", // optional: make file public
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Generate correct S3 URL including folder
    return `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
  } catch (err) {
    console.error("S3 Upload Error:", err.message);
    throw new Error(`Failed to upload file to S3: ${err.message}`);
  }
};