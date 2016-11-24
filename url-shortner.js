var tinyURL = require('tinyurl');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var perma   = require('perma');

var db_url = process.env.MONGOLAB_URI;
var encode = function(url, callback){
  var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  var valid = re.test(url);
  if(valid){
    console.log(db_url.toString());
    MongoClient.connect(db_url.toString(), function(err, db) {
      assert.equal(null, err);
      db.collection("permalinks").findOne({ o_url: url }, function(err2, value){
        if(value){
          callback(null, value.permalink);
        }
        else{
          var permalink = perma(url);
          console.log("new gen: "+ permalink);
          db.collection("permalinks").insertOne({ o_url: url, permalink: permalink });
          callback(null, permalink);
        }
        db.close();
      });
    });
  }
  else{
    var error = "Invalid url";
    callback(error);
  }
}

var decode = function(permalink, callback){
  MongoClient.connect(db_url, function(err, db) {
    assert.equal(null, err);
    db.collection("permalinks").findOne({ permalink: permalink }, function(err, value){
      if(err){
        callback(err);
      }
      if(value){
        callback(null, value.o_url);
      }
      else{
        callback("permalink not found");
      }
      db.close();
    });
  });
}

exports.encode = encode;
exports.decode = decode;
