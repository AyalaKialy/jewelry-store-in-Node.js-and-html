const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    categoryID : { type:mongoose.Schema.Types.ObjectId,require:true,ref:'category'},
    name : { type:String, require:true},
    price : { type:Number, require:true},
    description : { type:String, require:false},
    pictureName : {type:String, require:true}
    });

module.exports = mongoose.model('product',productSchema);


