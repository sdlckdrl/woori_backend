var express = require('express');
var path = require("path") 
var router = express.Router();
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'uploads/' })

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/web', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/super/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/super/itemManager', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/images/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/private', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/uploadImage', upload.single('imgfile'), function (req, res, next) {
  res.send(req.file); // object를 리턴함
})

module.exports = router;