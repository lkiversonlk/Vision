/**
 * Created by kliu on 10/07/2015.
 */

var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

router.post("/screens", function(req, res){
    var dao = req.app.get("dao");
    dao.rest("/screens", {}, function(error, screens){
        if(error){
            utils.logger.log("error", "fail to retrieve screens information", error);
            res.json({
                error : "fail to retrieve user information"
            });
        }else{
            res.json(
                screens
            );
        }
    });
});


module.exports = router;