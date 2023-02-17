import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import uploadController from './controllers/upload.controller.js';
import authRouter from './routes/auth.routes.js';
import propertyRouter from './routes/property.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URL, () => {
    console.log('MongoDB has been started successfully!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

app.use('/auth', authRouter);
app.use('/property', propertyRouter);
app.use('/upload', uploadController);

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
