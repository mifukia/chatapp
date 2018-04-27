var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        user: '名無し',
        mail: null
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body['username'];
    var email = req.body['email'];
    res.render('index', {
        user: userName,
        mail: email
    });
});

module.exports = router;
