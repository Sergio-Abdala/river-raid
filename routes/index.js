var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RIVER RAID' });
});
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'RIVER RAID' });
});

module.exports = router;
