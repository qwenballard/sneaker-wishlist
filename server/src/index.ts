import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Set CORS origin depending on environment
const corsOrigin = process.env.STAGE_FRONTEND_URL;

app.use(cors({ origin: corsOrigin }));

// API Routes
app.use('/api/auth', authRouter);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));

  // Fallback to React app for unknown routes (client-side routing)
  app.get('*', (req: Request, res: Response) => {
    try {
      res.sendFile(path.join(clientDist, 'index.html'));
    } catch (error) {
      res.status(500).json({ message: 'Internal server error - 1' });
    }
  });
}

// Handle 404 for unmatched API routes or invalid paths
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// General error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ message: 'Internal Server Error - 2' });
  } else {
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
