var express = require('express');
var mustacheExpress = require('mustache-express');
var request = require('request');

var { Client } = require('pg');
var connectionString = process.env.DATABASE_URL;

var app = express();
var port = 3000 || process.env.PORT;
var client = new Client({
    database:'posts-test',
    connectionString:connectionString,
    // ssl: true,
});

client.connect();

client.query('SELECT * FROM posts', function(err,res){
    if (err){
        console.log(err.stack);
    }
    console.log(res.rows);

    client.end();
});
//app.use(express.static('static'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

app.get("/", function(req,res){
    console.log('Hello World'); 
    res.render('forum',{
        postContent:"bla",
    });
});

app.get('/post', function(req,res){
    console.log('new post')
    //
});

app.listen(port, function(){
    console.log('listening port' + port); 
})

