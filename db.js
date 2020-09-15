const mongoose = require('mongoose');
module.exports = () => {
  var db = mongoose.connection;
  function connect() {    
    mongoose.connect('mongodb://paint:1729ckdrl!%40@sdlckdrl.iptime.org:27017/paint', { dbName: 'paint', useNewUrlParser: true });
  }
  connect();
  db.on('error', console.error);
  db.once('open', function(){
    console.log('connected mongodb server!');
  });
  db.on('disconnected', connect);
};