//npm run serve

// Registering a service worker 3.4 task-register-sw
if (!navigator.serviceWorker) return;

navigator.serviceWorker.register('/sw.js').then(function() {
  console.log('Registration worked!');
}).catch(function() {
  console.log('Registration failed!');
});

// Hijacking Requests 1 3-11 task-custom-response
self.addEventListener('fetch', function(event){
	event.respondWith(
		new Response('<h1>Hello World</h1>', {
			headers: {'Content-Type': 'text/html'}
		})
	);
});

//Hijacking Requests 2 3-13 gif-response
self.addEventListener('fetch', function(event){
	if (event.request.url.endsWith('.jpg')){
		event.respondWith(
			fetch('/img/dr-evil.gif')
		);		
	}
});

//Hijacking Requests 3 3-15 error-handling
self.addEventListener('fetch', function(event){
	fetch(event.request).then(function(response) {
	  if (response.status === 404) {
	    // TODO: instead, respond with the gif at
	    // /imgs/dr-evil.gif
	    // using a network request
	    return fetch('/imgs/dr-evil.gif');
	  }
	  return response;
	}).catch(function() {
	  return new Response("Uh oh, that totally failed!");
	})
});

//Install and Cache 3-17 install-cached
self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    'js/main.js',
    'css/main.css',
    'imgs/icon.png',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
  ];

  event.waitUntil(
    // TODO: open a cache named 'wittr-static-v1'
    // Add cache the urls from urlsToCache
    caches.open('wittr-static-v1').then(function(cache){
    	return cache.addAll(urlsToCache);
    })
  );
});

//Cache Response 3-18 task-cache-response
self.addEventListener('fetch', function(event) {
  // Leave this blank for now.
  // We'll get to this in the next task.
  event.respondWith(
  	caches.match(event.request).then(function(response){
  		if(response) return response;
  		return fetch(event.request);
  	})
  );
});

//Update Your CSS 3-20 task-handling-updates
var staticCacheName = 'wittr-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    // TODO: open a cache named 'wittr-static-v1'
    // Add cache the urls from urlsToCache
    // TODO: remove the old cache
    caches.keys().then(function(cacheNames){
    	return Promise.all(
			cacheNames.filter(function(cacheName){
				return cacheName.startsWith('wittr-') &&
					cacheName != staticCacheName;
			}).map(function(cacheName){
				return cache.delete(cacheName);
			})
    	);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Leave this blank for now.
  // We'll get to this in the next task.
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

//Adding UX 3-23, 3-34 task-update-notify, task-update-reload
//IndexController.js
IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  var indexController = this;

  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // TODO: if there's no controller, this page wasn't loaded
    // via a service worker, so they're looking at the latest version.
    // In that case, exit early
    if (!navigator.serviceWorker.controller){return;}
    // TODO: if there's an updated worker already waiting, call
    // indexController._updateReady()
    if (reg.waiting){indexController._updateReady();return;}
    // TODO: if there's an updated worker installing, track its
    // progress. If it becomes "installed", call
    // indexController._updateReady()
    if (reg.installing) {
    	indexController._trackInstalling(reg.installing);
    	return;
    }
    // TODO: otherwise, listen for new installing workers arriving.
    // If one arrives, track its progress.
    // If it becomes "installed", call
    // indexController._updateReady()
    reg.addEventListener('updatefound', function(){
    	indexController._trackInstalling(reg.installing);
    })
  });
	// TODO: listen for the controlling service worker changing
	// and reload the page
	navigator.serviceWorker.addEventListener('controllerchange' function(){
		window.location.reload();
	})
};
//New factored out function
IndexController.prototype._trackInstalling = function(worker) {
	var indexController = this;

	worker.addEventListener('statechange', function(){
		if (worker.state=='installed') {
			indexController._updateReady();
		}
	})
}

IndexController.prototype._updateReady = function(worker) {
  var toast = this._toastsView.show("New version available", {
    buttons: ['refresh', 'dismiss']
  });
  toast.answer.then(function(answer) {
    if (answer != 'refresh') return;
    // TODO: tell the service worker to skipWaiting
    worker.postMessage({action: 'skipWaiting'})
  });
};

//index.js (service worker)
var staticCacheName = 'wittr-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message
self.addEventListener('message', function(event){
	if (event.data.action == 'skipWaiting') {
		self.skipWaiting();
	}
})

//Caching the Page Skeleton 3-26 task-page-skeleton
var staticCacheName = 'wittr-static-v4';

self.addEventListener('install', function(event) {
  // TODO: cache /skeleton rather than the root page

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
  	if (requestUrl.pathname === '/') {
  		event.respondWith(caches.match('/skeleton'));
  		return;
  	}
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
