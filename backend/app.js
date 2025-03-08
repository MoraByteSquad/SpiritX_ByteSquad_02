import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(errorMiddleware); // Error handling middleware

// Routes
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('SpritX 2025 project by ByteSquad');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});

export default app;