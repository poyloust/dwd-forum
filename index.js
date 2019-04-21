var express = require('express');
var mustache = require('mustache-express');
var { Client } = require('pg');

var app = express;
var port = 3000 || process.env.PORT;

client.connect();

app.get('/',function(req,res){
    //
    mustache.render(something);

});


app.get('/post', function(req,res){

    //
})