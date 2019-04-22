var express = require('express');
var mustacheExpress = require('mustache-express');
var request = require('request');
const bodyParser = require('body-parser');
var { Client } = require('pg');
var connectionString = process.env.DATABASE_URL;

var app = express();
var port = 3000 || process.env.PORT;
var client = new Client({
    database:'posts-test',
    connectionString:connectionString,
    // ssl: true,
});
var posts;
var allPosts;
var myText = 'this is a new line'

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

client.connect();

updatePost();
function updatePost(){
    client.query('SELECT * FROM posts', function(err,res){
        if (err){
            console.log(err.stack);
        }
        allPosts = res.rows;
        app.get("/", function(req,res){
            console.log('Forum Loaded'); 
            res.render('forum',{
                "postContent":allPosts,
                "post":function(){
                    return this.message;
                }
            });
        });
    });
}



app.post('/update', function(req,res){
    var newPost = req.body.textarea;
    console.log(newPost);
    client.query("INSERT INTO posts (message) VALUES ('" + newPost+ "')"),function(err,res){
        if (err){
            console.log(err.stack);
        }
    }
    updatePost();
    console.log(allPosts);
    res.render('forum',{
        "postContent":allPosts,
        "post":function(){
            return this.message;
        }
    });
    // client.query('SELECT * FROM posts', function(err,res){
    //     if (err){
    //         console.log(err.stack);
    //     }
    //     allPosts = res.rows;
    //     console.log (res.rows);
    //     client.end();
    // });
    // res.render('forum',{
    //     "postContent":allPosts,
    //     "post":function(){
    //         return this.message;
    //     }
    // });
});

app.listen(port, function(){
    console.log('listening port' + port); 
})

