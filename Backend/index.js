import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './db.js';
import { userRouter } from './Routers/user.js';
import { forgotRouter } from './Routers/forgotPassword.js';
import { resetRouter } from './Routers/resetPassword.js';
import { shortURLRouter } from './Routers/shortURL.js';

// config dotenv
dotenv.config()

// PORT
const PORT = process.env.PORT ;

// initializing the server
const app = express();

// initializing the database
dbConnect();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/signup' , userRouter);
app.use('/login', userRouter);
app.use('/forgot', forgotRouter);
app.use('/reset', resetRouter);
app.use('/shorturl', shortURLRouter);
app.use('/s', shortURLRouter)

// listening the server
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))