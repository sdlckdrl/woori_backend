var express = require('express'); 
var router = express.Router(); 
var Item = require('../../item.js');
router.get('/items', function (req, res, next) { 
    Item.find((err, items) => {
        return res.json({result_code : 'success', items: items});
    });
});
router.post('/modify/:_id', function (req, res, next) { 
    Item.findById(req.params._id, function(err, item){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!item) return res.status(404).json({ error: 'item not found' });

        item = Object.assign(item, {
            name: req.body.name,
            m_code: req.body.m_code,
            category: req.body.category,
            etc1: req.body.etc1,
            etc2: req.body.etc2,
            etc3: req.body.etc3,
            standard: req.body.standard,
            unit: req.body.unit,
            receiving_price: req.body.receiving_price,
            price: req.body.price,
            inventory_quantity: req.body.inventory_quantity
        });
        //console.info(item)
        item.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({result_code : 'success'});
        });
    })
});
router.post('/add', function (req, res, next) { 
    var item = new Item();
    item = Object.assign(item, {
        _id:item.createObjectId(),
        code: req.body.code,
        name: req.body.name,
        m_code: req.body.m_code,
        category: req.body.category,
        etc1: req.body.etc1,
        etc2: req.body.etc2,
        etc3: req.body.etc3,
        standard: req.body.standard,
        unit: req.body.unit,
        receiving_price: req.body.receiving_price,
        price: req.body.price,
        inventory_quantity: req.body.inventory_quantity
    });
    item.save(function(err){
        if(err) res.status(500).json({error: 'failed to update'});
        res.json({result_code : 'success', item: item});
    });
});
router.post('/remove/:_id', function (req, res) {     
    Item.remove({ _id: req.params._id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.json({result_code : 'success'});
        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        //res.status(204).end();
    })
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = router;