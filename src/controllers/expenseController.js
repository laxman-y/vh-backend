const Expense =
require("../models/Expense");

const createExpense =
async(req,res)=>{

try{

const expense =
await Expense.create(
  req.body
);

res.status(201).json({
  success:true,
  expense
});

}catch(error){

res.status(500).json({
  success:false,
  message:error.message
});

}

};

const getExpenses =
async(req,res)=>{

try{

const expenses =
await Expense.find()
.sort({createdAt:-1});

const totalExpense =
expenses.reduce(
(sum,item)=>
sum + item.amount,
0
);

res.json({
  success:true,
  totalExpense,
  expenses
});

}catch(error){

res.status(500).json({
  success:false,
  message:error.message
});

}

};

module.exports = {
  createExpense,
  getExpenses
};