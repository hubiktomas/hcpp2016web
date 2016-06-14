var express = require('express');
var router = express.Router();

/* GET home page. */

var pageTitle = 'Hackers Congress Paralelní Polis 2016';
var hashTitle = '#HCPP2016';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.'

router.get('/', function(req, res) {
  res.render('index', {
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

router.post('/', function(req, res) {
  mc.lists.subscribe({
    id: req.body.list_id,
    email: {
      email: req.body.email
    }}, function(data) {
      res.render('index', {
        title: pageTitle,
        title_hash: hashTitle,
        description: pageDescription,
        mailchimp_message: 'You subscribed successfully! Look for the confirmation email.'
      });
    },
    function(error) {
      var errorMsg;
      if (error.error) {
        console.log(error.code + ": " + error.error);
        errorMsg = error.error;
      }
      res.render('index', {
        title: pageTitle,
        title_hash: hashTitle,
        description: pageDescription,
        mailchimp_message: 'There was an error subscribing user. ' + errorMsg
      });
    });
});

module.exports = router;
