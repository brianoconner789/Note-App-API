// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes'; 
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB using the new connection string format
mongoose.connect('mongodb://localhost:27017/note-taking-app', {
  connectTimeoutMS: 10000, // Optional: Set a timeout for the connection attempt
});

app.use('/auth', authRoutes);
app.use('/api', noteRoutes); 

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
