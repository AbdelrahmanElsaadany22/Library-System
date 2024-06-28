import express, { NextFunction, Request, Response, Express } from 'express';
import { AppError } from './utils/error.handler';
import router from './routers/v1.routes';
import * as dotenv from 'dotenv';
dotenv.config();

const bootstrap = (app: Express) => {
    app.use(express.json());
    app.use('/api/v1', router);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        throw new AppError('Route not found', 404);
    });

    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
        const { message, status, stack } = err;
        res.status(status || 500).json({
            message,
            ...(process.env.MODE === 'development' && { stack }),
        });
    });
};

export default bootstrap;
