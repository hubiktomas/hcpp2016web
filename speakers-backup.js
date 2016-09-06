var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');

var apiUrl = 'http://frab.paralelnipolis.cz/en/hcpp2016/public/speakers.json';

function formatData(jsonData) {

  var speakers = jsonData.schedule_speakers.speakers;

  speakers.forEach(function(speaker, index) {
    fetch('http://frab.paralelnipolis.cz' + speaker.image)
      .then(function(res) {
        return res.buffer();
      })
      .then(function(blob) {
        console.log('Writing file ' + index + '.jpg');
        fs.writeFile(path.join(__dirname + '/assets/backup-images/image_') + index + '.jpg', blob, function(err) {
          if (err) throw err;

          console.log('File ' + index + '.jpg saved!');
        });
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
    console.log('Writing backup JSON file');
    fs.writeFile(path.join(__dirname + '/speakers_backup.json'), JSON.stringify(jsonData), function(err) {
      if (err) throw err;

      console.log('Backup JSON saved!');
    });
  })
  .catch(function(err) {
    console.log(err);
  });
