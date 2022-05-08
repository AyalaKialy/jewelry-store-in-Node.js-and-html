const express = require('express');
const app = express();
require('./Connection/mongoose');
const {ENVIRONMENT,PORT} = require ('./config');
const logconfig = require('./configuration');
const winston = require('winston')
const logger = winston.createLogger(logconfig);
require('dotenv').config();
const user = require('./Router/user');
const category = require('./Router/category');
const product = require('./Router/product');
const order = require('./Router/order');
const path = require('path')

app.use(express.json());
app.use(express.static('./StaticFiles'));

app.use('/user',user);
app.use('/category',category);
app.use('/product',product);
app.use('/order',order);

app.use((err, req, res, next)=>{
    if (ENVIRONMENT=='development')
    logger.error(err.message)
    if(err.message == 'user validation failed: email: please enter valid email')
    res.status(400).send(err.message)
    else
    res.status(500).send(err.message)
})

app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname,'./StaticFiles/404.html'));

});

app.listen(PORT,()=> logger.warn(`server is runing on port ${PORT}`));





