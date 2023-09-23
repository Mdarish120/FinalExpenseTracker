import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expense.js"

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/expense",expenseRouter);

app.listen(5000);
console.log(5000);