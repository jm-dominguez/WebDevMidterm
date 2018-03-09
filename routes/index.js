var express = require('express');
var router = express.Router();
const request = require("request");

/* GET home page. */
router.get('/hola', function(req, res, next) {
  res.status(200).json({
    message: "Hola"
  });
});

module.exports = router;
