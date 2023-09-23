import db from "../models/index.js";

const Expense=db.expenseInfo;

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

