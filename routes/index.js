var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.jsによる気象情報閲覧システム' });
});

module.exports = router;
