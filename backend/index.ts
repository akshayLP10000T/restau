import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import userRoute from './routes/user';
import itemRoute from './routes/item';
import orderRoute from './routes/order';
import restaurentRoute from './routes/restaurent';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Default middlewares
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//Api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurent", restaurentRoute);
app.use("/api/v1/item", itemRoute);
app.use("/api/v1/order", orderRoute);

//Server listening
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server listen at port ${PORT}`);
});