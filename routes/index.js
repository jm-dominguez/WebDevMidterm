var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;


router.get("/tags", function(req, res, next){
  let url = "mongodb://elvargas:dictador@ds163418.mlab.com:63418/instatag";
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }
    let collection = db.collection("tags");
    let objects = collection.find({}).toArray(function (err, docs){
      if(err){
        throw err;
      }
     
      res.status(200).json({
        status: 200,
        tags: docs
      });
      db.close();
    });

  });
});

router.post("/tags", function(req, res, next){
  let ptag = req.body.tag;
  let url = "mongodb://elvargas:dictador@ds163418.mlab.com:63418/instatag";
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }
    else{
      let collection = db.collection("tags");
      collection.insert({tag: ptag, });
      res.status(200).json({
        message: "Object Added"
      });
      db.close();
    }
  });
});

router.post("/mostRepeated", function(req, res, next){
  let ptag = req.body.tag;
  let pvalue = req.body.value;
  let url = "mongodb://elvargas:dictador@ds163418.mlab.com:63418/instatag";
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }
    else{
      let collection = db.collection("mostRepeated");
      collection.insert({tag: ptag, value: pvalue });
      res.status(200).json({
        message: "Object Added"
      });
      db.close();
    }
  });

});

router.get("/mostRepeated", function(req, res, next){
  let url = "mongodb://elvargas:dictador@ds163418.mlab.com:63418/instatag";
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }
    else{
      let collection = db.collection("mostRepeated");
      collection.find().sort({value:-1}).limit(1).toArray(function(err, docs){
        if(err){
          throw err;
        }

        res.status(200).json({
          status: 200,
          message: docs
        });
        
      });
    }
  });
});

module.exports = router;
