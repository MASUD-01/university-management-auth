import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import globalErorrHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters/', AcademicRoutes);

app.use('/api/v1/', routes);
// //testing
// app.get('/', async (req, res, next) => {
//   // throw new ApiError(300,'ore baba error')
//   Promise.reject(new Error('Unhandled promise Rejection'))
// })
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// app.post('/', (req: Request, res: Response) => {
//   console.log(req.body)
//   res.send('Hello World!')
// })

//global error handler
app.use(globalErorrHandler);
export default app;
