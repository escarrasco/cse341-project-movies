var express = require('express');
// bodyparser for json
const bodyParser = require('body-parser');
// for mongodb connection
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

var app = express();
const port = process.env.PORT || 3000

//auth0 lesson 7
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'G3jSaMyD7MqX648YlUWIQ2cUw3zSYpi8',
  issuerBaseURL: 'https://dev-q42a6phacpqvxwbz.us.auth0.com'
};

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


//auth0
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//auth0
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  }); 

  
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// mongo connection
mongodb.initDb( (err, mongodb) => {
    if (err){
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and Server is running on port ${port}`);
    }
});