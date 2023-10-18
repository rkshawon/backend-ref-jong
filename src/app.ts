import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import handleNotFoundRoutes from './app/middlewares/handleNotFoundRoutes';
import routes from './app/routes';
const app: Application = express();

// using cors
app.use(cors({ origin: true }));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/users/', userRouter);
app.use('/api/v1', routes);

//Testing routes is running well
app.get('/', async (req: Request, res: Response) => {
  res.send('Fortinet Backend Server is Running');
});

//global error handler
app.use(globalErrorHandler);
// Hanlde Not Found with custom messaages
app.use(handleNotFoundRoutes);

export default app;
