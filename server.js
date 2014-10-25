var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var connection = new Sequelize('lawyer_scoreboard', 'root', null, {'host': 'localhost', 'dialect': 'mysql' });

var Lawyer = connection.define('lawyer', {
    name: Sequelize.STRING,
    location:  Sequelize.STRING,
    record: Sequelize.STRING,
    hourlyRate: Sequelize.STRING
});

app.get('/lawyers', function(req, res) {
    Lawyer.all().success(function(data) {
        res.send(data);
    })
});

try {
    connection.sync();
}

catch(err) {
    console.log('database error: ' + err);
}

app.listen(3000);