import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import expenseRouter from "./routes/expense.js"
import leaderboardRouter from "./routes/leaderboard.js";
import paymentRouter from "./routes/payment.js";

const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/expense",expenseRouter);
app.use("/leaderboard",leaderboardRouter);
app.use("/payment",paymentRouter)

app.listen(5000);
console.log(5000);