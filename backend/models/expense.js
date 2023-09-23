

const ExpenseModel = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    

    });
  
    return Expense;
  };
  
  export default ExpenseModel;
  