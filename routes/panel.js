var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

/* GET users listing. */
router.get('/', function (req, res, next) {
    utils.loadUserInfo(req, function(error, user_info){
        if(error){
            req.session.destroy(function(){
                res.redirect("/");
            })
        }else{
            res.render("panel/panel", {
                user_info : user_info
            });
        }
    });
});

module.exports = router;
