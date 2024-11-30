import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './DB/connectToDB.js';
import authRoutes from './Routes/auth.routes.js';
import caseRoutes from './Routes/case.routes.js';
import AWSRoutes from './Routes/aws.routes.js';
import labRoutes from './Routes/lab.routes.js';
import userRoutes from './Routes/user.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Uncomment if needed for large payloads
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/auth', authRoutes);
app.use('/case', caseRoutes);
app.use('/aws', AWSRoutes);
app.use('/lab', labRoutes);
app.use('/getme', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8999, () => {
    connectToDB();
    console.log(`Server is running on port 8999`);
});
