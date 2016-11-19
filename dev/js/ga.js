(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-83412074-3', 'auto');
ga('send', 'pageview');

window.addEventListener('beforeinstallprompt', function(e) {
    // beforeinstallprompt Event fired

    // e.userChoice will return a Promise. 
    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    e.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if (choiceResult.outcome == 'dismissed') {
            ga('send', {
                hitType: 'event',
                eventCategory: 'AppInstallBanner',
                eventAction: 'dismissed'
            });
        } else {
            ga('send', {
                hitType: 'event',
                eventCategory: 'AppInstallBanner',
                eventAction: 'accepted'
            });
        }
    });
});
