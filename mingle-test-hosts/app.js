var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var host = require('./hosts/hosts-controller');

const PORT = 4000;

const USER = "userApplication:5leRm47rUyvjizyz"
const CLUSTER = "aws-ohio-0.tb9j9";
const DATABASE = "mingleDB";
const DATABASE_URL = `mongodb+srv://${USER}@${CLUSTER}.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

var db = {};

db.startDatabase = async function() {
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

db.startDatabase().then(() => {
    console.log("DATABASE CONNECTED")

    app.use(cors());

    console.info("Configure bodyparser");
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    
    app.get('/', function(req, res){
      res.send("Hello World");
    });

    app.listen(PORT, function(){
      console.log('APPLICATION STARTED!');
    });

    host.exportList();

});
