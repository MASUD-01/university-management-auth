import httpStatus from 'http-status';
import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import globalErorrHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes------routes----------------------------
app.use('/api/v1/', routes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//global error handler
app.use(globalErorrHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api is not Found',
      },
    ],
  });
  next();
});
export default app;
