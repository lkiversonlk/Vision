var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

/* GET users listing. */
router.get('/', function (req, res, next) {
    utils.loadUserInfo(req, function(error, user_info){
        if(error){
            utils.logger.log("error", "unable to retrieve user infomation", error);
            req.session.destroy(function(){
                res.redirect("/");
            })
        }else{
            var dao = req.app.get("dao");
            dao.rest("/puttings", {}, function(error, puttings){
                if(error){
                    utils.logger.log("error", "unable to retrieve ")
                    puttings = [];
                }else{
                    res.render("panel/panel", {
                        user_info : user_info,
                        puttings : puttings
                    });
                }
            });
        }
    });
});

module.exports = router;
