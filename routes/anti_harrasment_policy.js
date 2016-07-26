var express = require('express');
var router = express.Router();

/* GET page. */

var pageTitle = 'Hackers Congress Paralelní Polis 2016';
var hashTitle = '#HCPP2016';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';

router.get('/', function(req, res) {
  res.render('index', {
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

module.exports = router;
