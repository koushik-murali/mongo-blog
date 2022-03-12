const express = require('express');
const app = express();
const article = require('./articles')   
const dotenv = require('dotenv');
const Mongoose = require('mongoose');
const serverless = require('serverless-http')
dotenv.config();
Mongoose.connect(process.env.CONSTRING, {useNewUrlParser: true, useUnifiedTopology: true,})

app.set('view engine', 'ejs')


app.get('/', async (req, res) =>{
    try{
        const articles = await article.find()
        res.render('index', {articles: articles})
    } catch(e)
    {
        console.log(e)
    }
    
} 
)



//app.listen(process.env.PORT || 3000);