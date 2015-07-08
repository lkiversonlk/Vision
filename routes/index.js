var express = require('express');
var router = express.Router();
var utils = require("../src/utils");


router.use(utils.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {};
  if(req.user_info){
    data['user_info'] = req.user_info;
  }
  res.render('index', data);
});

module.exports = router;
