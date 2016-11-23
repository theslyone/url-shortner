var http = require("http"), express = require("express");
var urlShorter = require('node-url-shorter');
var tinyURL = require('tinyurl');
var shorten = require('simple-short');
var gglurl = require('node-gglurl');

var app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.use(express.static(__dirname + '/public'));

app.get("/new/:url(*)", function(req,res){
    res.writeHead(200);
    var url = req.params.url;
    let responseObj = {};
    //var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; ///^(http|https):\/\/[^ "]+$/
    var valid = re.test(url);
    if(valid){
      /*urlShorter.getShortUrl(url)
      .then(function(data){
          responseObj = {original_url: url, short_url: data };
          res.end(JSON.stringify(responseObj, null, " "));
      })
      .fail(function(err){
        responseObj = {error:err };
        res.end(JSON.stringify(responseObj, null, " "));
      });
      shorten(url, function(s_url) {
        console.log(s_url);
        responseObj = {original_url: url, short_url: s_url };
        res.end(JSON.stringify(responseObj, null, " "));
      });*/
      gglurl.encode(function(err, s_url) {
        if (err) {
            console.log(err);
            responseObj = {error:err };
            res.end(JSON.stringify(responseObj, null, " "));
        } else {
            console.log(s_url);
            responseObj = {original_url: url, short_url: s_url };
            res.end(JSON.stringify(responseObj, null, " "));
        }
      }, url);
    }
    else{
      responseObj = {error: "Invalid url" };
      res.end(JSON.stringify(responseObj, null, " "));
    }
});

app.get("/", function(req,res){
    res.render('index');
});


var server = http.createServer(app);
server.listen(process.env.PORT || 8080);
console.log("app started");
