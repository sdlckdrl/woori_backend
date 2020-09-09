var express = require('express'); 
var router = express.Router(); 
var colors = require('../data.json'); 
router.get('/info', function (req, res, next) { 
    var gubun = req.query.gubun
    var result = colors.filter(function(o){
        return o.code == gubun
    })
    res.send(result[0]) 
});
router.get('/list', function (req, res, next) { 
    var gubun = req.query.gubun
    var text = (req.query.text==null?"":req.query.text).toLowerCase();
    var tp = (req.query.type==null?"":req.query.type).toUpperCase();
    var obj = colors.filter(function(o){
        return o.code == gubun
    })
    if(!!text){//있음
        var list = obj[0].data.filter(function (o) {
            if(tp==""){
                return o.cd.toLowerCase().indexOf(text) > -1 || (o.name||"").toLowerCase().indexOf(text) > -1 || (o.munsel||"").toLowerCase().indexOf(text) > -1
            }else{
                return o.type == tp && (o.cd.toLowerCase().indexOf(text) > -1 || (o.name||"").toLowerCase().indexOf(text) > -1 || (o.munsel||"").toLowerCase().indexOf(text) > -1)
            }
        }); 
        res.send(list) 
    }else{
        var list = obj[0].data.filter(function (o) {
            if(tp!=""){
                return o.type == tp
            }else{
                return true;
            }
        }); 
        res.send(list) 
    }
});

router.get('/autocomplte', function (req, res, next) { 
    var gubun = req.query.gubun
    var text = req.query.text.toLowerCase();
    var tp = (req.query.type==null?"":req.query.type).toUpperCase();
    var obj = colors.filter(function(o){
        return o.code == gubun
    })
    if(!!text){
        var list = obj[0].data.filter(function (o) {
            if(!tp){
                return o.cd.toLowerCase().indexOf(text) > -1 || (o.name||"").toLowerCase().indexOf(text) > -1 || (o.munsel||"").toLowerCase().indexOf(text) > -1
            }else{
                return o.type == tp && (o.cd.toLowerCase().indexOf(text) > -1 || (o.name||"").toLowerCase().indexOf(text) > -1 || (o.munsel||"").toLowerCase().indexOf(text) > -1)
            }
        }); 
        res.send(list) 
    }
}); 

router.get('/all', function (req, res, next) { 
    res.send(colors) 
});
module.exports = router;