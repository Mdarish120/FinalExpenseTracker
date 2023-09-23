import express from "express";
import { addExpense, getExpense ,deleteExpense,editExpense} from "../controllers/expense.js";



const router=express.Router();


router.post("/",addExpense);
router.get("/",getExpense);
router.put("/:id",editExpense);
router.delete("/:id",deleteExpense);



export default router;