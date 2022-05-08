const mongoose = require('mongoose');
const userModel = require('../Models/userModel');

const logconfig = require('../configuration');
const winston = require('winston');
const { ObjectId } = require('mongodb');
const logger = winston.createLogger(logconfig);

module.exports = {
getAllUsers : async(req,res,next)=> {
    try{
    await userModel.find().then((users) => {
        res.status(200).json({users})
        })
    }
    catch(error){
        logger.error(error),
            res.status(500).json({error}),
            next(error)
        };
  },
getUserById : async(req,res,next) => {
    try{
    const id = req.params.id;
    await userModel.findById(id).then((user) => {
        res.status(200).json({user})
    })
}  
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
getUserByEmailAndPassword:async(req,res,next) => {
    try {
        const email = req.params.email;
        const password = req.params.password;
        await userModel.findOne({email:email, password:password}).then((user)=>{
                res.status(200).json({user});
        })
    }
    catch (error) {
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
createUser : async(req,res,next) => {
    try{
     const {firstName,lastName,email,password,adress} = req.body;
    const newUser = new userModel({
        _id:new mongoose.Types.ObjectId(),
        firstName,lastName,email,password,adress,lastVisit:Date.now()
    });
    await newUser.save().then((user) => {
        res.status(200).json({user})
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
updateUser : async(req,res) => {
    try{
    const id = req.params.id;
    await userModel.updateOne({_id:id},req.body).then(() =>{
        res.status(200).json({
            message:'user update!'
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
deleteUser : async(req,res,next) => {
    try{
    const id = req.params.id;
    await userModel.remove({_id:id}).then(() => {
        res.status(200).json({
            message: `user deleted`
        })
    })
}
    catch(error){
        logger.error(`${error}`),
        res.status(500).json({error}),
        next(error)
    };
},
getAllOrderByUserId: async(req, res,next) => {
    try{
        const userId = req.params.id;
        const id = await userModel.findOne({_id:userId}).populate({path:'allOrdersByUserId',select:'userID date amount products'});
        await res.send(id);
    }
    catch(error) {
        next(error)
    }
}
}


