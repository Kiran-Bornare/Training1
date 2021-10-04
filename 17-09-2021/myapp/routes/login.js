var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {

    console.log(req.body)
    var a = req.body.u;
    var b = parseInt(req.body.p);
    res.render('loginresult', { mya: a, myb: b})
});
