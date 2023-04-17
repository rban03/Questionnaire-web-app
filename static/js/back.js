// Push a state onto the history stack to prevent the back button from being clicked
history.pushState(null, null, document.URL);

// Listen for the user clicking the back button
window.addEventListener('popstate', function(event) {
  // Push another state onto the history stack to keep the user on the current page
  history.pushState(null, null, document.URL);
});
