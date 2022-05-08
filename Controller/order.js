const mongoose = require('mongoose');
const orderModel = require('../Models/orderModel');

const logconfig = require('../configuration');
const winston = require('winston');
const res = require('express/lib/response');
const logger = winston.createLogger(logconfig);

module.exports = {
GetAllOrders : async(req,res,next)=> {
    try{
    await orderModel.find().populate('user').populate('products').then((orders) => {
        res.status(200).json({orders})
    })
    }
    catch(error){
        logger.error(`${error}`),
            res.status(500).json({error}),
            next(error)
        };
  },
GetOrderById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await orderModel.findById(id).populate('user').populate('product').then((order) => {
        res.status(200).json({order})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
GetExpenciveOrders : async(req,res,next) =>{
    try{
        await orderModel.findOne().sort({'amount' : -1}).then((orders) => {
            res.status(200).json({orders})
        })
        }
        catch(error){
            logger.error(`${error}`),
                res.status(500).json({error}),
                next(error)
            };
},
CreateOrder : async(req,res,next) => {
    try{
    const {userID,amount,products} = req.body;

    const neworder = new orderModel({
        _id:new mongoose.Types.ObjectId(),
       userID,date:Date.now(),amount,products
    });
    await neworder.save().then(() => {
        res.status(201).json({message:'create order'})
    })
}
    catch(error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateOrder : async(req,res,next) => {
    try{
    const id = req.params.id;
    await orderModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({message:'order update!'})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteOrder : async(req,res,next) => {
    try{
    const id = req.params.id;
    await orderModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `order ${id} deleted`
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error})
        next(error)
    };
}
}
