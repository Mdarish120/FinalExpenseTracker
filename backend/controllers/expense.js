import db from "../models/index.js";
import Razorpay from "razorpay";

const Expense=db.expenseInfo;
const razorpayInstance = new Razorpay({
    key_id:"rzp_test_LGXCa6YWZ0NGjj",
    key_secret: "oRXrtmRPzBPR0FWMozhkqAfP"
}); 

export const addExpense= async(req,res)=>{
  
    const {description ,category,amount}=req.body;
    try {
          
        const result=await Expense.create({description,category,amount});
        res.status(201).json(result);
        
    } catch (error) {
          console.log(error);
          res.status(500).json(error);
    }
}

export const getExpense= async(req,res)=>{
    const { page, perPage } = req.query;

    // Ensure that page and perPage are valid integers
    const parsedPage = parseInt(page, 10);
    const parsedPerPage = parseInt(perPage, 10);
    console.log(parsedPerPage);
    
    // Check if parsedPage or parsedPerPage are NaN (invalid)
    if (isNaN(parsedPage) || isNaN(parsedPerPage)) {
      return res.status(400).json({ message: 'Invalid page or perPage value' });
    }
    
    try {
      const startIndex = (parsedPage - 1) * parsedPerPage;
      const endIndex = startIndex + parsedPerPage;
    
      // Fetch the paginated data and total count using Sequelize
      const expenses = await Expense.findAll({
        offset: startIndex,
        limit: parsedPerPage,
      });
    
      const totalCount = await Expense.count();
    
      // Send the paginated data as well as the total count of items in the response headers
      res.set('x-total-count', totalCount);
      res.json(expenses);
    }catch (error) {

        console.log(error);
        
    }
 
  
  
}



export const editExpense= async(req,res)=>{
   
    const {description,amount,category}=req.body;
    const {id} =req.params;
   try {

    const result=await Expense.update({description,category,amount},{where:{id}});
    res.status(201).json("Edit successfully..");
    
    
   } catch (error) {
    
   }
}


export const deleteExpense= async(req,res)=>{

    const {id} =req.params;
    try {
        
        const res=await Expense.destroy({where:{id}});
        res.json("Expense delete Successfully...")
    } catch (error) {
         console.log(error)
    }
}


export const createPayment=(req,res)=>{

    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:"rzp_test_LGXCa6YWZ0NGjj",
                        product_name:req.body.name,
                        description:req.body.desc,
                        contact:"9720428758",
                        name: "Arish",
                        email: "mdarish159@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }


}

