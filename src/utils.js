/**
 * Created by kliu on 08/07/2015.
 */

var winston = require("winston");

var logger = new (winston.Logger)({
    transports : [
        new (winston.transports.Console)({level : 'error'}),
        new (winston.transports.File)({
            filename : "error.log"
        })
    ]
});

var utils = {
    loadUserInfo : function(req, callback){
        if(req.user){
            if(req.session.user_info){
                callback(null, req.session.user_info);
            }else{
                req.app.get('dao').get('users', {
                    id : req.user
                }, function(error, docs){
                    if(error || docs.length == 0){
                        callback({'error' : 'user id ' + req.user + ' not found'});
                    }else{
                        req.session.user_info = docs[0];
                        callback(null, docs[0]);
                    }
                });
            }
        }else{
            callback({'error' : 'no user id'});
        }
    },
    logger : logger
};

module.exports = utils;