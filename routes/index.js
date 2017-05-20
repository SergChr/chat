var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

/*
router.use(function(req, res){
    res.send("404 Not Found");
});
*/

module.exports = router;
