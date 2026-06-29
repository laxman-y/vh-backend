const Return=require("../models/Return");

const generateReturnNumber=async()=>{

    const today=new Date();

    const prefix=`RET-${today.getFullYear()}${String(today.getMonth()+1).padStart(2,"0")}${String(today.getDate()).padStart(2,"0")}`;

    const last=await Return.findOne({

        returnNumber:{
            $regex:`^${prefix}`
        }

    }).sort({createdAt:-1});

    let seq=1;

    if(last){

        seq=Number(
            last.returnNumber.split("-").pop()
        )+1;

    }

    return `${prefix}-${String(seq).padStart(4,"0")}`;

};

module.exports=generateReturnNumber;