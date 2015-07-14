var express = require('express');
var router = express.Router();
var passport = require("passport");
var utils = require("../src/utils");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
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
var filters = [
    {
        title: "房价/平方米",
        options:[
            {
                value:"1至2万"
            },
            {
                value:"2至5万"
            },
            {
                value:"5至10万"
            },
            {
                value:"10万以上"
            }
        ]
    },
    {
        title: "房龄",
        options:[
            {
                value:"1至3年"
            },
            {
                value:"3至8年"
            },
            {
                value:"8至15年"
            },
            {
                value:"15年以上"
            }
        ]
    }
];
router.get("/put", function(req, res){
    utils.loadUserInfo(req, function(error, user_info){
        if(error){
            res.redirect("/");
        }else{
            var data = {
                user_info : user_info,
                filters : filters
            };
            res.render('users/put', data);
        }
    });
});
module.exports = router;

