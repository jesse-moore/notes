

function name(){
	return new Promise(function(resolve, reject){
		//Does Something
		resolve();
	})
}

return new Promise(function(resolve) {
	console.log(this); //Logs Global Object
	window.setTimeout(function() {
		resolve();
	}, ms);
});

function ready() {
	// Credit to Jake Archibald
	// https://github.com/jakearchibald/svgomg/blob/master/src/js/page/utils.js#L7
  return new Promise(function(resolve) {
	  function checkState() {
		  if (document.readyState !== 'loading') {
		    resolve();
		  }
		}
		document.addEventListener('readystatechange', checkState);
		checkState();
  });
};

ready().then(wrapperResolved);

// Just here for your testing
function wrapperResolved() {
	var completion = document.querySelector('.completion');
	completion.innerHTML = "Resolved!";
};




(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * XHR wrapped in a Promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      // Handle network errors
      if (!response.ok) {
        throw Error(response.statusText ? response.statusText : 'Uknown network error')
      }

      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      addSearchHeader(response.query);
      console.log(response);
    })
    .catch(function(error) {
      addSearchHeader('unknown');
      console.log(error);
    });
  });
})(document);