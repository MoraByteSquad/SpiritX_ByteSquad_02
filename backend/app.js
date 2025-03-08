import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import playerRouter from './routes/player.routes.js';
import leaderboardRouter from './routes/leaderboard.routes.js';
import userTeamRouter from './routes/userTeam.routes.js';

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true })); // Allow all origins
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/player', playerRouter);
app.use('/api/v1/leaderboard', leaderboardRouter);
app.use('/api/v1/user-team', userTeamRouter);

app.get('/', (req, res) => {
  res.send('SpritX 2025 project by ByteSquad');
});

// Error handling middleware should be the last middleware
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});

export default app;