const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {productSchema} = require('./productModel');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID : { type:mongoose.Schema.Types.ObjectId,require:true,ref:'user'},
    date : { type:Date,require:false},
    amount : { type:Number,require:true },
    products : {type:[mongoose.Schema.Types.ObjectId],require:true,ref:'product'}
    });

module.exports = mongoose.model('order',orderSchema);


