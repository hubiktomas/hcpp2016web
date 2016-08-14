  // Track newsletter form submit
  document.getElementById('newsletterForm').addEventListener('submit', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Newsletter',
      eventAction: 'subscribe',
      transport: 'beacon'
    });
  }, false);

  // Track main navigation clicks
  var navLinks = document.querySelectorAll('.nav a');
  Array.prototype.forEach.call(navLinks, function(navLink) {
    navLink.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Navigation',
        eventAction: 'click',
        eventLabel: navLink.textContent
      });
    }, false);
  });

  // Track footer navigation clicks
  var footerNavLinks = document.querySelectorAll('.footer-nav a');
  Array.prototype.forEach.call(footerNavLinks, function(footerNavLink) {
    footerNavLink.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Navigation',
        eventAction: 'click',
        eventLabel: footerNavLink.textContent
      });
    }, false);
  });

  // Track ticket click
  var ticketItems = document.querySelectorAll('ticket');
  Array.prototype.forEach.call(ticketItems, function(ticketItem) {
    ticketItem.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Tickets',
        eventAction: 'click',
        eventLabel: ticketItem.querySelector('h3').textContent,
        transport: 'beacon'
      });
    });
  });

  // Track speaker click
  var speakerItems = document.querySelectorAll('.speaker-item');
  Array.prototype.forEach.call(speakerItems, function(speakerItem) {
    speakerItem.addEventListener('click', function(event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Speakers',
        eventAction: 'click',
        eventLabel: speakerItem.querySelector('.speaker-accent').textContent
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
