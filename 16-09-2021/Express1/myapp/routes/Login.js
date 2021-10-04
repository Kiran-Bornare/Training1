var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Login');
});
router.post('/', function (req, res, next) {

  console.log(req.body)
  var a = req.body.n1;
  var b = parseInt(req.body.n2);
  res.render('Loginresult', { mya: a, myb: b})
});

module.exports = router;
