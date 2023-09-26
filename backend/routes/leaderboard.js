import express from "express";
import { getUserAllExpanses} from "../controllers/expense.js";
import auth from "../middleware/auth.js";



const router=express.Router();


router.get("/",auth,getUserAllExpanses);








export default router;