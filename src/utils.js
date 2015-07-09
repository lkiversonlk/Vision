/**
 * Created by kliu on 08/07/2015.
 */

var utils = {
    loadUserInfo : function(req, dao, callback){
        if(req.user){
            dao.get('users', {
                id : req.user
            }, function(error, docs){
                if(error || docs.length == 0){
                    callback({'error' : 'user id ' + req.user + ' not found'});
                }else{
                    callback(null, docs[0]);
                }
            });
        }else{
            callback({'error' : 'no user id'});
        }
    }
};

module.exports = utils;