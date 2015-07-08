var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var flash = require("express-flash");
var routes = require('./routes/index');
var users = require('./routes/users');
var panel = require("./routes/panel");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "lkiversonlk"}));
app.use(flash());
var passport = require("passport"), LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var yaml = require("js-yaml");
var fs = require("fs");
var wiston = require("winston");
var config;
try {
    config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf-8"));
} catch (e) {
    winston.log("error", "fail to load config.yaml, please confirm the configuration file is correct");
    process.exit(1);
}

var Dao = require("./src/dao").Dao;
try {
    var dao = new Dao(config.database);
    app.set("dao", dao);
} catch (e) {
    winston.log("error", "fail to initial database connection", e);
    process.exit(1);
}

//login
passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    function (user, passwd, done) {
        var dao = app.get("dao");
        dao.get("logins", {
            username: user,
            password: passwd
        }, function (error, docs) {
            if (error) {
                winston.log("error", "fail to search users database", e)
                done(null, false, {message: "fail"});
            } else {
                if (docs.length == 0) {
                    done(null, false, {message: "incorrect password or non-existed usernmae"});
                } else {
                    done(null, user._id);
                }
            }
        });
    }
));

app.use('/', routes);
app.use('/users', users);
app.use('/panel', panel);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
