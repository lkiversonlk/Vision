var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/users/',
    failureRedirect: '/',
    failureFlash : "用户名密码组合错误"
}));

router.get("/register", function (req, res) {
    res.render("register", {});
});

router.post("/registration", function(req, res){

});

module.exports = router;
