var express = require('express'); 
var router = express.Router(); 
var Item = require('../../item.js');
router.get('/items', function (req, res, next) { 
    Item.find((err, items) => {
        return res.json({result_code : 'success', items: items});
    });
});
router.post('/modify', function (req, res, next) { 
    console.log(req.body)
    Item.updateOne({code: req.body.code}, {inventory_quantity: req.body.inventory_quantity});
    res.json({result_code : 'success'});
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = router;