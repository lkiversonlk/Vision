/**
 * Created by kliu on 10/07/2015.
 */

var express = require('express');
var router = express.Router();

router.post("/screens", function(req, res){
    var dao = req.app.get("dao");
    dao.rest("/screens", {}, function(error, screens){
        if(error){
            res.json({
                error : ""
            });
        }else{
            res.json(
                screens
            );
        }
    });
});


module.exports = router;