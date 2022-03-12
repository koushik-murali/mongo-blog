const express = require('express');
const app = express();
const article = require('./articles')
const images = require('./pictures')
const dotenv = require('dotenv');
const Mongoose = require('mongoose');
const serverless = require('serverless-http')
dotenv.config();
Mongoose.connect(process.env.CONSTRING, {useNewUrlParser: true, useUnifiedTopology: true,})

app.set('view engine', 'ejs')

app.get('/', async (req, res) =>{
    try{
        const articles = await article.find()
        const websiteImages = await images.find()
        res.render('home', { Pictures: websiteImages, articles: articles})
    } catch(e)
    {
        console.log(e)
    }
    
} 
)
app.listen(process.env.PORT || 3000);