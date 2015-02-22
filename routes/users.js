var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/p', function(req, res, next) {
  res.send('respond with a resource 222222222222');
});
module.exports = router;
