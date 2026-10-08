import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import dashboardRoutes from './routes/dashboard';

const app = express();

app.set('trust proxy', 1);

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_ORIGIN 
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'exp://127.0.0.1:8081', '*'], // Allowing all origins for dev/mobile ease, restrict in prod
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app;
