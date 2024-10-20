import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_API_TOKEN!;
const ENDPOINT = "http://localhost:5173/";

export const client = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Restaurent app",
};