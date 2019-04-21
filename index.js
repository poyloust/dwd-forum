var express = require('express');
var mustache = require('mustache-express');
var request = require('request');
var { Client } = require('pg');

var app = express;
var port = 3000 || process.env.PORT;
var client = new Client({database:'posts-test'});

client.connect();

client.query('SELECT * FROM posts', function(err,res){
    if(err) throw err;
    console.log(res);
});

app.get('/',function(req,res){
    //
    mustache.render(something);

});


app.get('/post', function(req,res){

    //
});

app.listen(port, function(){
    console.log('listening port' + port); 
})

client.end();
