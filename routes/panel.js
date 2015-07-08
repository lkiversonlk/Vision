var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

router.use(utils.login);

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(req.user_info){
        var data = {
            user_info : req.user_info
        };
        res.render("panel", data);
    }else{
        res.redirect("/");
    }
});

module.exports = router;
