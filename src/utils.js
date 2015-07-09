/**
 * Created by kliu on 08/07/2015.
 */

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
                        req.session.user_infp = docs[0];
                        callback(null, docs[0]);
                    }
                });
            }
        }else{
            callback({'error' : 'no user id'});
        }
    }
};

module.exports = utils;