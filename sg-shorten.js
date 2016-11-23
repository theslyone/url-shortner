var urlShorter = require('node-url-shorter');
var tinyURL = require('tinyurl');

var shorten = function(url){
  var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; ///^(http|https):\/\/[^ "]+$/
  var valid = re.test(url);
  if(valid){
    tinyURL.shorten(url, function(s_url) {
      console.log(s_url);
      responseObj = {original_url: url, short_url: s_url };
      return JSON.stringify(responseObj, null, " ");
    });
    /*urlShorter.getShortUrl(url)
    .then(function(s_url){
        responseObj = {original_url: url, short_url: s_url };
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
    });
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
    }, url);*/
  }
  else{
    responseObj = {error: "Invalid url" };
    return JSON.stringify(responseObj, null, " ");
  }
}

modules.export = shorten;
