var express = require('express'); 
var router = express.Router(); 
var User = require('../../user.js');
router.post('/login', function (req, res, next) { 
    if(req.body.user_id === null || req.body.user_pw === null){
        res.json({result_code : 'fail', error:'아이디와 비밀번호를 확인하세요.'});
    }else{
        User.findOne({user_id: req.body.user_id}, (err, user) => {
            if(!user){
                return res.json({result_code : 'fail', error:'해당 회원이 존재하지 않습니다.'});
            }
            user.comparePassword(req.body.user_pw, (err, isMatch) => {
                if(!isMatch){
                    return res.json({
                        result_code : 'fail', error:'비밀번호가 틀렸습니다.'
                    })
                }
                //res.json({user_id: user.user_id, result_code:'success'});
            })
            user.generateToken((err, info) => {
                res.json({'token': info.token, result_code:'success'});
            })
        });
    }
});
router.get('/user/info', function (req, res, next) { 
    let user_id = req.headers['access-token']
    User.findOne({user_id: user_id}, (err, user) => {
        res.json(user);
    });
});

// 요청 헤더 내의 authorization 헤더에서 토큰 추출
// 토큰이 존재하면, 토큰을 req.token에 할당
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next(); // 다음 콜백함수 진행
    } else {
        res.send(403);
    }
}
process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = router;