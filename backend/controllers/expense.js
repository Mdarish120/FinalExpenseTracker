import db from "../models/index.js";
import moment from "moment";
import { Sequelize,Op } from 'sequelize';

const Expense=db.expenseInfo;
const User=db.authTable;



export const addExpense= async(req,res)=>{
  
    const {description ,category,amount}=req.body;
    const {id}=req.params;
    try {
          
        const result=await Expense.create({description,category,amount,userId:id});
        res.status(201).json(result);
        
    } catch (error) {
          console.log(error);
          res.status(500).json(error);
    }
}

export const getExpense= async(req,res)=>{
    const { page, perPage } = req.query;
    const {id}=req.params;

  

    // Ensure that page and perPage are valid integers
    const parsedPage = parseInt(page, 10);
    const parsedPerPage = parseInt(perPage, 10);
   
    
    // Check if parsedPage or parsedPerPage are NaN (invalid)
    if (isNaN(parsedPage) || isNaN(parsedPerPage)) {
      return res.status(400).json({ message: 'Invalid page or perPage value' });
    }
    
    try {
      const startIndex = (parsedPage - 1) * parsedPerPage;
      const endIndex = startIndex + parsedPerPage;
    
      // Fetch the paginated data and total count using Sequelize
      const expenses = await Expense.findAll({
        where: { userId: id },
        offset: startIndex,
        limit: parsedPerPage,
      });
    
      const totalCount = await Expense.count();
    
      // Send the paginated data as well as the total count of items in the response headers

      res.json({expenses,totalCount});
    }catch (error) {

        console.log(error);
   
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
 
  
  
}



export const editExpense= async(req,res)=>{
   
    const {description,amount,category}=req.body;
    const {id} =req.params;
   try {

    const result=await Expense.update({description,category,amount},{where:{id}});
    res.status(201).json("Edit successfully..");
    
    
   } catch (error) {
    console.log(error);
   
    res.status(500).json({ message: 'Internal Server Error' });
   }
}


export const deleteExpense= async(req,res)=>{

    const {id} =req.params;
    try {
        
        const res=await Expense.destroy({where:{id}});
        res.json("Expense delete Successfully...")
    } catch (error) {
        console.log(error);
   
        res.status(500).json({ message: 'Internal Server Error' });
    }
}





export const getReportByDay= async(req,res)=>{
    const { date } = req.query; 
    const {id} =req.params;

    console.log(`Date....................  ${date}`)
    const format = 'DD-MM-YYYY ';
    const parsedDate = moment(date, format);
    console.log(parsedDate.format())
    try {
         
       const data=await Expense.findAll({ where: {
        createdAt: {
            [Op.between]: [parsedDate.startOf('day').format(), parsedDate.endOf('day').format()],
            },userId:id
          },});


         // console.log(data);
       res.status(200).json(data);
    } catch (error) {
        console.log(error);
   
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}



export const getReportByMonth = async (req, res) => {

    const { date } = req.query; 
    const {id} =req.params;
    // Specify the correct format for the date string, including time
    const format = 'DD-MM-YYYY ';
   console.log("month data......")
    // Parse the date string with the specified format
    const parsedDate = moment(date, format);
  
  
  
    try {
      // Extract the month and year from the parsed date
      const year = parsedDate.year();
      const month = parsedDate.month() + 1; // Months in JavaScript are 0-based, so add 1
  
      // Use Sequelize to query expenses for the specified month and year
      const data = await Expense.findAll({
        where: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month),
          ],
          userId:id
        },
      });
    
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getUserAllExpanses=async(req,res)=>{
  
    console.log("leaderboard")
    try {
    
  
      const usersWithExpenses = await User.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Expense,
            attributes: [
              'category',
              'description',
              'amount',
            ],
          },
        ],
      });
  
      // Format the data as needed
      const formattedData = usersWithExpenses.map((user) => {
        const formattedUser = user.toJSON(); // Convert the Sequelize object to a plain JavaScript object
  
        // Calculate total expenses for the user
        formattedUser.totalExpenses = user.Expenses.reduce(
          (total, expense) => total + expense.amount,
          0
        );
  
        // Remove the 'Expenses' property
        delete formattedUser.Expenses;
  
        return formattedUser;
      });
  
      res.status(200).json(formattedData);
    } catch (error) {
          console.log(error);
          res.status(500).json("server error")
    }

  }




