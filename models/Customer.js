const mongoose=require('mongoose')
const CustomerSchema=new mongoose.Schema({
    name:String,
    amount:Number

})
const CustomerModel=mongoose.model("customers",CustomerSchema)
module.exports=CustomerModel