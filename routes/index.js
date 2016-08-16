var express = require('express');
var router = express.Router();

/* GET home page. */

var hashTitle = '#HCPP2016';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';
var topicsDesciption_one = 'The concept of authoritative state is gradually becoming obsolete. The rise of sharing economies with reputation models, digital contracts and cryptocurrencies makes the role of central governments useless. In this era, you might share more with random people from other parts of the world than you do with your neighbors.';
var topicsDesciption_two = 'Come and join us at the 3rd Hackers Congress Paralelní Polis with hundreds of technology enthusiasts, tech-entrepreneurs, activists and cryptoanarchists to celebrate the age of digital freedom and decentralization!';
var includeHeader = true;

router.get('/', function(req, res) {

  var mailchimpMessage = null;
  
  if (req.query.subscribe === 'success') {
    mailchimpMessage = 'You subscribed successfully! Look for the confirmation email.';
  }
  else if (req.query.subscribe === 'error') {
    mailchimpMessage = 'There was an error subscribing user. ' + req.query.msg;
  }

  res.render('index', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title_hash: hashTitle,
    description: pageDescription,
    topics_description_one: topicsDesciption_one,
    topics_description_two: topicsDesciption_two,
    include_header: includeHeader,
    mailchimp_message: mailchimpMessage
  });
});

router.post('/subscribe', function(req, res) {
  mc.lists.subscribe({
    id: req.body.list_id,
    email: {
      email: req.body.email
    }},
    function(data) {
      res.redirect('/?subscribe=success');
    },
    function(error) {
      var errorMsg;
      if (error.error) {
        console.log(error.code + ": " + error.error);
        errorMsg = error.error;
      }
      res.redirect('/?subscribe=error&msg=' + errorMsg)
    });
});

module.exports = router;
