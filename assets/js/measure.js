  // Track newsletter form submit
  document.getElementById('newsletterForm').addEventListener('submit', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Newsletter',
      eventAction: 'subscribe',
      transport: 'beacon'
    });
  }, false);

  // Track speaker click
  var speakerItems = document.querySelectorAll('.speaker-item');
  Array.prototype.forEach.call(speakerItems, function(speakerItem) {
    speakerItem.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Speakers',
        eventAction: 'click'
      });
    }, false);
  });

  // Track open more Speakers
  document.querySelector('.see-more').addEventListener('click', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Speakers',
      eventAction: 'open'
    }, false);
  });
