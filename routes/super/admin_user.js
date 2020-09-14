var express = require('express'); 
var router = express.Router(); 
router.post('/login', function (req, res, next) { 
    res.send({user_id: 'lsk0477', user_pw: 'sk6628gk',}) 
});
module.exports = router;