const Product =
require("../models/Product");

const getLowStockProducts =
async(req,res)=>{

try{

const products =
await Product.find();

const lowStockProducts =
products.filter(
(product)=>
product.stock <=
product.lowStockAlert
);

res.json({

success:true,

count:
lowStockProducts.length,

products:
lowStockProducts

});

}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};

module.exports = {
getLowStockProducts
};