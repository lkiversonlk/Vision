var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

function renderPanel(req, res){
    var data = {
        user_info : req.session.user_info
    };
    res.render("panel", data);
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(!req.user){
        req.session.destroy(function(error){
            res.redirect("/");
        });
    }else{
        if(!req.session.user_info){
            var dao = req.app.get("dao");
            utils.loadUserInfo(req, dao,function(error, user_info){
                if(error){
                    req.session.destroy(function(error){
                        res.redirect("/");
                    });
                }else{
                    req.session.user_info = user_info;
                    renderPanel(req, res);
                }
            });
        }else{
            renderPanel(req.res);
        }
    }
});

module.exports = router;
