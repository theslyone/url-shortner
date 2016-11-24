var http = require("http");
var express = require("express");
var urlShorter = require('./url-shortner');

var app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.use(express.static(__dirname + '/public'));

app.get("/new/:url(*)", function(req,res){
  res.writeHead(200);
  var responseObj = {original_url: req.params.url, short_url: "" };
  urlShorter.encode(req.params.url, function(err, permalink){
    if(err){
      responseObj = { error: err };
    }
    else{
      responseObj.short_url = req.headers.host + "/" + permalink;
    }
    res.end(JSON.stringify(responseObj, null, " "));
  });
});

app.get("/:permalink", function(req,res){
  urlShorter.decode(req.params.permalink, function(err, original_url){
    if(err){
      res.writeHead(200);
      res.end(JSON.stringify({ error: err }, null, " "));
    }
    res.redirect(original_url);
  });
});

app.get("/", function(req,res){
    res.render('index');
});


var server = http.createServer(app);
server.listen(process.env.PORT || 8080);
console.log("app started");
