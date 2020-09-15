const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  token: String,
  user_id: String,
  user_pw: String,
  user_nm: String
});
userSchema.methods.comparePassword = function(plainPassword, cb){
  console.log(plainPassword)
  bcrypt.compare(plainPassword, this.user_pw, function(err, isMatch){
    console.log(isMatch)
    if(err) return cb(err)
      cb(null, isMatch)
  })
}
userSchema.methods.generateToken = function(cb){
  var user = this
  var token = jwt.sign(user.user_id, 'secretToken')
  user.token = token
  //console.info(user)
  user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
  })
}
module.exports = mongoose.model('User', userSchema);