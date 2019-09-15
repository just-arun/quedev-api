import express, { json, urlencoded, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import DataBase from './config/db';
import PostRoute from './app/posts/routes/index';
import UsersRoute from './app/users/routes/index';

const app = express();

DataBase.Connect();

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({extended: false}));

app.use('/posts', PostRoute.Private);
app.use('/get', PostRoute.Public);
app.use('/users', UsersRoute.Public);
app.use('/user', UsersRoute.Private);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.code || 500;
    const message = err.message || "error occered";
    res.status(statusCode).json({ error: { message } });
});

export default app;
