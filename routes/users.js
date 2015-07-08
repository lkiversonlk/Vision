var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/panel/',
    failureRedirect: '/',
    failureFlash : "用户名密码组合错误"
}));

router.get("/register", function (req, res) {
    res.render("register", {});
});

router.post("/registration", function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var dao = req.app.get("dao");
    dao.get("logins",
        {
            username : username
        },
        function(error, docs)
        {
            if(error){
                res.render("error", {error : "未知错误"});
            }else{
                if(docs.length == 0){
                    dao.add("logins", {
                        username : username,
                        password : password
                    }, function(error, logins){
                        if(error){
                            res.render("error", {error : "未知错误"});
                        }else{
                            if(logins.length == 0){
                                res.render("error", {error : "未知错误"});
                            }else{
                                dao.add("users", {
                                    id : logins._id,
                                    name : nickname
                                }, function(error, users){
                                    if(error){
                                        res.render("error", {error : "未知错误"});
                                    }else{
                                        if(users.length == 0){
                                            res.render("error", {error : "未知错误"});
                                        }else{
                                            req.login(users.id, function(error){
                                                if(error){

                                                }else{
                                                    res.redirect("/panel/");
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                else{
                    res.render("error", {error : "账户已经存在"});
                }
            }
        });
});

module.exports = router;
