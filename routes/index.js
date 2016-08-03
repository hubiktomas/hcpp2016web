var express = require('express');
var router = express.Router();

/* GET home page. */

var hashTitle = '#HCPP2016';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';
var topicsDesciption_one = 'Our 3rd annual Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, freedom lovers, and crypto enthusiasts in Europe. Its main goal is to celebrate the new era of digital freedom and technological progress. The congress aims to promote the most recent trends and events in art, science, crypto-technologies,  decentralized economy, and hacktivism.';
var topicsDesciption_two = 'Come and join hundreds of technology enthusiasts, academics, tech-entrepreneurs, journalists and students, in order to catch a glimpse of the future!';
var includeHeader = true;

router.get('/', function(req, res) {
  res.render('index', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title_hash: hashTitle,
    description: pageDescription,
    topics_description_one: topicsDesciption_one,
    topics_description_two: topicsDesciption_two,
    include_header: includeHeader
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
