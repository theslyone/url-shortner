var http = require("http"), express = require("express");
var shorten = require('./sg-shorten');

var app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "pug");
app.use(express.static(__dirname + '/public'));

app.get("/new/:url(*)", function(req,res){
    res.writeHead(200);
    res.end(shorten(req.params.url));
});

app.get("/", function(req,res){
    res.render('index');
});


var server = http.createServer(app);
server.listen(process.env.PORT || 8080);
console.log("app started");
