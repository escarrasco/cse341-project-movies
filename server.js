var express = require('express');
// bodyparser for json
const bodyParser = require('body-parser');
// for mongodb connection
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');


var app = express();
const port = process.env.PORT || 3000


app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
       // res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
        next();
      })
    .use('/', require('./routes'));

// lesson 1
/*app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/

// lesson 2
// mongo connection
mongodb.initDb( (err, mongodb) => {
    if (err){
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and Server is running on port ${port}`);
    }
});