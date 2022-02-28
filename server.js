const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs')
app.set("views",path.join(__dirname,"views"))
app.use(mongoInit)

function mongoInit(req,res,next){
    mongodb.connect(process.env.CONSTRING, {useNewUrlParser: true, useUnifiedTopology: true,}, async function(err,client) {
        req.results = await client.db().collection("articles").find().toArray();
        next();
    })
}   

app.get('/', mongoInit, (req,res) =>{
    const articles = req.results;
    res.render('index', {articles})

} 
)

app.listen(process.env.PORT);