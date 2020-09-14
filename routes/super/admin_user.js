var express = require('express'); 
var mongoose = require('mongoose');
var User = require('../../user.js');
var router = express.Router(); 
router.get('/login', function (req, res, next) { 
    User.find({user_id: req.params.user_id}, (err, users) => {
        res.send(users[0]);
    });
    //res.send({user_id: 'lsk0477', user_pw: 'sk6628gk',}) 
});
module.exports = router;