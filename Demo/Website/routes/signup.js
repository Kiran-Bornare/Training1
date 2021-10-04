var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function (req, res, next) {

    console.log(req.body)
    var a = parseInt(req.body.txt1);
    var b = parseInt(req.body.txt2);
    res.render('signup1', { save: a, submit: b})
});

module.exports = router; 
