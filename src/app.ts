import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';


import errorMiddleware from './middlewares/errorMiddleware';
import router from "./routes";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });





app.use(cors({
    origin: true,  // Replace with your frontend domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));

app.use(limiter);

app.use(express.json());
app.use(helmet());

app.use("/apis", router);

app.use(errorMiddleware);

export default app;
