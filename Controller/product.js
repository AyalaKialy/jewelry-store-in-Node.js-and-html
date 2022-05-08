const mongoose = require('mongoose');
const productModel = require('../Models/productModel');
const categoryeModel = require('../Models/categoryModel');

const logconfig = require('../configuration');
const winston = require('winston');
const req = require('express/lib/request');
const logger = winston.createLogger(logconfig);

module.exports = {
GetAllProducts : async(req,res,next)=> {
    try{
    await productModel.find().populate('categoryID').then((products) => {
        res.status(200).json({products})
    })
    }
    catch(error){
        logger.error(`${error}`),
            res.status(500).json({error}),
            next(error)
        };
    
  },
GetProductById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await productModel.findById(id).populate('category').then((product) => {
        res.status(200).json({product})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
GetProductsByCategory : async(req,res,next) =>{
    try{
        const categoryId = req.params.categoryId;
        await productModel.find({categoryID:categoryId}).then((products) =>{
            res.status(200).json({products});
        })
    }
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
CreateProduct : async(req,res,next) => {
    try{
    const {categoryID,name,price,description,pictureName} = req.body;
  
    const newProduct = new productModel({
        _id:new mongoose.Types.ObjectId(),
        categoryID,name,price,description,pictureName
    });
        return await newProduct.save().then(() => {
        res.status(200).json({
            message:'create product'
        })
    })
}
    catch(error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(next)
    };
},
updateProduct : async(req,res,next) => {
    try{
    const id = req.params.id;
    await productModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'product update!'
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteProduct : async(req,res,next) => {
    try{
    const id = req.params.id;
    await productModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `product ${id} deleted`
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
}
}
