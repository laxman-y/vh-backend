const mongoose = require("mongoose");

const returnItemSchema = new mongoose.Schema(
{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    productName:{
        type:String,
        required:true
    },
    invoiceItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
    
    soldQuantity:{
        type:Number,
        required:true
    },

    returnedQuantity:{
        type:Number,
        required:true
    },

    refundAmount:{
        type:Number,
        required:true
    },

    condition:{
        type:String,
        enum:[
            "GOOD",
            "DAMAGED"
        ],
        default:"GOOD"
    },

    reason:{
        type:String,
        default:""
    }
},
{
    _id:true
});

const returnSchema=new mongoose.Schema({

    returnType:{
    type:String,
    enum:[
        "Refund",
        "Replacement",
        "Exchange"
    ],
    default:"Refund"
},
approvedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    default:null
},

approvedAt:{
    type:Date
},

    returnNumber:{
        type:String,
        unique:true,
        required:true
    },

    invoice:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invoice",
        required:true
    },

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        default:null
    },

    customerName:{
        type:String,
        default:"Walk In Customer"
    },

    items:[returnItemSchema],

    totalRefund:{
        type:Number,
        default:0
    },

    refundMethod:{
        type:String,
        enum:[
            "Cash",
            "UPI",
            "Card",
            "Bank",
            "Exchange"
        ],
        default:"Cash"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Rejected",
            "Completed"
        ],
        default:"Pending"
    },

    remarks:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});

module.exports=mongoose.model(
"Return",
returnSchema
);