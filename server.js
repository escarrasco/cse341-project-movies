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
  //baseURL: 'http://localhost:3000',
  baseURL: 'https://cse341-project-movies.onrender.com/',
  clientID: process.env.AUTH0_CLIENT,
  issuerBaseURL: 'https://dev-q42a6phacpqvxwbz.us.auth0.com'
};
//auth0
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
       // res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
        next();
      })
    .use(function (req, res, next) {
        res.locals.user = req.oidc.user;
        next();
      })
    .use('/', require('./routes'));




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