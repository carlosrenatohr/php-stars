var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', {hola: '2'});
  // res.send('respond with a resource');
});

module.exports = router;
