import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectDb } from './db';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import businessRouter from './routes/business';
import authRouter from './routes/auth';
import feedbackRouter from './routes/feedback';
import config from 'config';

const app: Express = express();

const db: string = process.env.NODE_ENV === 'test'
  ? config.get('mongoURI-test')
  : config.get('mongoURI');
//connect to mongoDb
connectDb(db);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/auth', authRouter);
app.use('/api/feedbacks', feedbackRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
