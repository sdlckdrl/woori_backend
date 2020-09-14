const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://paint:1729ckdrl!%40@192.168.0.22:27017/paint', { dbName: 'paint', useNewUrlParser: true }, function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./user.js'); // user.js는 나중에 만듭니다.
};