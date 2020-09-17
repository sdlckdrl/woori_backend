const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRETKEY_FOR_JWT = 'secretkey';
const saltRounds = 10; //salt 10자리로 비밀번호를 암호화한다.
const userSchema = new mongoose.Schema({
  token: String,
  user_id: String,
  user_pw: String,
  user_nm: String
});
userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.user_pw, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch);
  })
}
userSchema.methods.generateToken = function(cb){
  var user = this
  var payload = {_id : user._id.toHexString(), user_nm: user.user_nm}
  var token = jwt.sign(payload, SECRETKEY_FOR_JWT, { expiresIn: '60m'})
  user.token = token
  //console.info(user)
  user.save(function(err, user){
    if(err) return cb(err);
    cb(null, user);
  })
}

//유저모델에 유저정보를 저장하기 전에 함수 실행하기
userSchema.pre("save", function (next) {
  //index.js 에서 user.save했을 때의 그 넘어온 정보 담기
  var user = this;
  //비밀번호 암호화 시키기
  //1. 솔트생성
  if (user.isModified("user_pw")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //error생기면 NEXT로 가기.. NEXT-> INDEX.JS
      bcrypt.hash(user.user_pw, salt, function (err, hash) {
        //error 안생기면 암호화하기 (클라가넣은 비밀번호, salt, 콜백함수) 넣어주기
        //hash는 암호화된 비밀번호
        // Store hash in your password DB.
        if (err) return next(err);
        user.user_pw = hash; //에러 안나면 유저 패스워드를 해쉬된 비밀번호로 넣기
        next(); //그리고 넘겨주기
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);