import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 4000;
const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;
import Connection from "./db.js";
import Router from "./routes/route.js";
import dashboardRouter from "./routes/admin-routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

Connection(Username, Password);

app.use('/', Router);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})