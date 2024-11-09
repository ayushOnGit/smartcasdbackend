import express from "express";

import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";


dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET = process.env.AWS_SECRET;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const randomImageName = (bytes = 8) => {
  return crypto.randomBytes(bytes).toString("hex");
};

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET,
  },
});




router.post("/upload", upload.single("file"), async function (req, res, next) {
console.log(req.file);
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: req.file.originalname + randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    // Construct a simple response object
    const response = {
      message: "File uploaded successfully",
      location: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${params.Key}`,
      imageName: params.Key,
    };
    res.json(response); // Send the simplified object
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading file");
  }
});

router.get("/download/:imageName", async function (req, res, next) {
  const imageName = req.params.imageName;
  console.log('imagename')
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: imageName,
  };

  const command = new GetObjectCommand(params);

  try {
    // Set expiration time to the maximum allowable (7 days)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 604800 });
    res.send(signedUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});


export default router;
