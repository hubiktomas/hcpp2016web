(function($, ga) {
  // Track newsletter form submit
  $('#newsletterForm').on('submit', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Newsletter',
      eventAction: 'subscribe',
      transport: 'beacon'
    });
  });

  // Track speaker click
  $('.speaker-item').on('click', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Speakers',
      eventAction: 'click'
    });
  });

  // Track open more Speakers
  $('.see-more').on('click', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Speakers',
      eventAction: 'open'
    });
  });
})(jQuery, ga);
