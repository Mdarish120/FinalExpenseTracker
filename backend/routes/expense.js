import express from "express";
import { addExpense, getExpense ,deleteExpense,editExpense,createPayment} from "../controllers/expense.js";



const router=express.Router();


router.post("/",addExpense);
router.get("/",getExpense);
router.put("/:id",editExpense);
router.delete("/:id",deleteExpense);
router.post("/payment",createPayment);



export default router;