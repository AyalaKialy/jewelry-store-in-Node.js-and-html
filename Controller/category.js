const mongoose = require('mongoose');
const CategoryModel = require('../Models/categoryModel');

const logconfig = require('../configuration');
const winston = require('winston')
const logger = winston.createLogger(logconfig);

module.exports = {
GetAllCategoryies : async(req,res,next)=> {
    try{
        await CategoryModel.find().then((Categoryies) => {
        res.status(200).json({Categoryies})
    })
    }
        catch(error){
            logger.error(`${error}`),
            res.status(500).json({error}),
            next(error)
        };
    
  },
GetCategoryById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await CategoryModel.findById(id).then((Category) => {
        res.status(200).json({Category})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
CreateCategory : async(req,res,next) => {
    try{
    const {name} = req.body;
    const newCategory = new CategoryModel({
        _id:new mongoose.Types.ObjectId(),
        name
    });
    await newCategory.save().then(() => {
        res.status(200).json({
            message:'create Category'
        })
    })
}
    catch(error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateCategory : async(req,res,next) => {
    try{
    const id = req.params.id;
    await CategoryModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'Category update!'
        })
    })
}
    catch(error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteCategory : async(req,res,next) => {
    try{
    const id = req.params.id;
    await CategoryModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `Category ${id} deleted`
        })
    })
}
    catch(error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
}
}
