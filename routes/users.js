var express = require('express');
var router = express.Router();
var passport = require("passport");
var utils = require("../src/utils");

/**
 * user page needs data:
 * user_info :
 * balance :
 * creatives :
 * messages :
 *     [
 *         {
 *             id:
 *             from:
 *             date:
 *             title:
 *             body:
 *         }
 *     ]
 */
router.get('/', function (req, res, next) {
    utils.loadUserInfo(req, function(error, user_info){
        if(error){
            utils.logger.log("error", "failt to retrieve user infomation", error);
            req.session.destroy(function(){
                res.redirect("/");
            })
        }else{
            var dao = req.app.get("dao");
            dao.rest("/messages", {}, function(error, messages){
                if(error){
                    utils.logger.log("error", "failt to retrieve user messages", error);
                    messages = [];
                }
                res.render("users/index", {
                    user_info : user_info,
                    balance : 2341123,
                    creatives : 23423422,
                    messages : messages
                });
            })

        }
    });
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/panel/',
    failureRedirect: '/',
    failureFlash: "用户名密码组合错误"
}));

router.get("/register", function (req, res) {
    res.render("users/register", {register : true});
});

router.post("/registration", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var dao = req.app.get("dao");
    dao.get("logins",
        {
            username: username
        },
        function (error, docs) {
            if (error || docs.length != 0) {
                res.render("error", {error: "注册失败"});
            } else {
                dao.add("logins", {
                    username: username,
                    password: password
                }, function (error, login) {
                    if (error) {
                        res.render("error", {error: "未知错误"});
                    } else {
                        dao.add("users", {
                            id: login._id,
                            name: nickname
                        }, function (error, user) {
                            if (error) {
                                res.render("error", {error: "未知错误"});
                            } else {
                                req.login(user.id, function (error) {
                                    if (error) {
                                        res.redirect("/");
                                    } else {
                                        req.session.user_info = user;
                                        res.redirect("/panel");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
});

router.get("/signout", function(req, res){
    req.logOut();
    req.session.destroy(function(){
        res.redirect("/");
    });
});

/**
 * filter:
 *   title
 *   options:
 *       value
 * @type {Array}
 */

router.get("/put", function(req, res){
    utils.loadUserInfo(req, function(error, user_info){
        if(error){
            res.redirect("/");
        }else{
            var data = {
                user_info : user_info
            };
            res.render('users/put', data);
        }
    });
});
module.exports = router;

