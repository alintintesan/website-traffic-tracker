(function () {
    const now = new Date();
    const uniqueVisitExpirationInMins = 1;

    const pageUrl = window.location.href;
    const storedVisitExpiration = localStorage.getItem(pageUrl);
    const visitNotStoredOrExpired = !storedVisitExpiration || storedVisitExpiration && new Date(storedVisitExpiration) < now;

    if (visitNotStoredOrExpired) {
        const visitExpiration = new Date(now.getTime() + uniqueVisitExpirationInMins * 60 * 1000);
        localStorage.setItem(pageUrl, visitExpiration.toISOString());
        console.log(`New unique visit to: ${pageUrl} detected. Visit will expire at ${visitExpiration}.`);

        fetch('http://localhost:3000/tracker/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: pageUrl, timestamp: now.toISOString() })
          })
          .then(response => response.json())
          .then(response => console.log(response.message));
    } else {
        console.log(`Already visited: ${pageUrl}. Existing visit will expire at: ${new Date(storedVisitExpiration)}.`);
    }
})();