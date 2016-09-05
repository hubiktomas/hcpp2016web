require('dotenv').config({silent: true});
var fetch = require('node-fetch');
var fs = require('fs');

var apiUrl = process.env.API_URL;

function formatData(jsonData) {

  var speakers = jsonData.schedule_speakers.speakers;

  speakers.forEach(function(speaker, index) {
    fetch('http://frab.paralelnipolis.cz' + speaker.image)
      .then(function(res) {
        return res.buffer();
      })
      .then(function(blob) {
        fs.writeFileSync('assets/backup-images/image_' + index + '.jpg', blob);
      })
      .catch(function(err) {
        console.log(err);
      });

    speaker.image = '/backup-images/image_' + index + '.jpg';
  });

  return jsonData;
}

fetch(apiUrl)
  .then(function(res) {
    return res.json();
  })
  .then(function(jsonData) {
    var speakers = jsonData.schedule_speakers.speakers;

    speakers.forEach(function(speaker, index) {
      var match = speaker.image.match(/(\/system\/people\/avatars\/[0-9]+\/[0-9]+\/[0-9]+)\/(medium|large|small)\/([a-zA-Z0-9\-]+\.jpg)/);
      if (match) {
        speaker.image = match[1] + '/huge/' + match[3];
      }
    });

    return jsonData;
  })
  .then(function(jsonData) {
    return formatData(jsonData);
  })
  .then(function(jsonData) {
    fs.writeFile('speakers_backup.json', JSON.stringify(jsonData));
  })
  .catch(function(err) {
    console.log(err);
  });
