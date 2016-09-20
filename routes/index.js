require('dotenv').config({silent: true});
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');

/* GET home page. */

var hashTitle = '#HCPP2016';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';
var topicsDesciption_one = 'The concept of authoritative state is gradually becoming obsolete. The rise of sharing economies with reputation models, digital contracts and cryptocurrencies makes the role of central governments useless. In this era, you might share more with random people from other parts of the world than you do with your neighbors.';
var topicsDesciption_two = 'Come and join us at the 3rd Hackers Congress Paralelní Polis with hundreds of technology enthusiasts, tech-entrepreneurs, activists and cryptoanarchists to celebrate the age of digital freedom and decentralization!';
var includeHeader = true;

var formatApiData = function(apiData) {
  var speakers = apiData.schedule_speakers.speakers.map(function(speaker, index) {
    var orderMatch = speaker.description.match(/{{(.*)}}/) || [0, 100];
    speaker.order = parseInt(orderMatch[1]);

    return speaker;
  });

  speakers.sort(function(a, b) {
    if (a.order > b.order) {
      return 1;
    }

    if (a.order < b.order) {
      return -1;
    }

    return 0;
  })

  var speakerRows = [];

  while (speakers.length) {
    speakerRows.push(speakers.splice(0, 4));
  }

  return speakerRows;
}

router.get('/', function(req, res) {

  var mailchimpMessage = null;

  if (req.query.subscribe === 'success') {
    mailchimpMessage = 'You subscribed successfully! Look for the confirmation email.';
  }
  else if (req.query.subscribe === 'error') {
    mailchimpMessage = 'There was an error subscribing user. ' + req.session.subscribeErrorMsg;
  }

  var contactMessage = null;

  if (req.query.subscribe === 'success') {
    contactMessage = 'Your message was successfully sent! We will contact you soon.';
  }
  else if (req.query.subscribe === 'error') {
    contactMessage = 'There was an error sending message. ' + req.session.contactErrorMsg;
  }

  fs.readFile('speakers_backup.json', function(err, data) {
    if (err) throw err;

    var apiData = JSON.parse(data);

    var speakerRows = formatApiData(apiData);

    res.render('index', {
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.originalUrl,
      title_hash: hashTitle,
      description: pageDescription,
      topics_description_one: topicsDesciption_one,
      topics_description_two: topicsDesciption_two,
      include_header: includeHeader,
      mailchimp_message: mailchimpMessage,
      contact_message: contactMessage,
      speakerRows: speakerRows
    });
  });
});

module.exports = router;
