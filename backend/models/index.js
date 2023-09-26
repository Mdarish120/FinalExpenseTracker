import * as dbConfig from "../utils/db.js";
import authModel from "./auth.js";
import expenseModel from "./expense.js";


import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,

  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,


    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);


sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.authTable=authModel(sequelize,DataTypes);
db.expenseInfo=expenseModel(sequelize,DataTypes)

db.authTable.hasMany(db.expenseInfo, { foreignKey: 'userId' });
db.expenseInfo.belongsTo(db.authTable, { foreignKey: 'userId' });


db.sequelize.sync({ force: false})
.then(() => {
    console.log('yes re-sync done!')
})

export default db;