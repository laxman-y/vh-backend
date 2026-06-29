const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  category:{
    type:String,
    enum:[
      "Rent",
      "Electricity",
      "Salary",
      "Internet",
      "Transport",
      "Maintenance",
      "Other"
    ],
    required:true
  },

  amount:{
    type:Number,
    required:true
  },

  description:{
    type:String,
    default:""
  },

  expenseDate:{
    type:Date,
    default:Date.now
  }

},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
  "Expense",
  expenseSchema
);