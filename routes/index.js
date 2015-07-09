var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {};
  if(req.session.user_info){
    data['user_info'] = req.session.user_info;
  }
  res.render('index', data);
});

module.exports = router;
