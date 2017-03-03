//What's this doing?
(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
        })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
        })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
        });
    }
    
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();

// Request data from the backend
// Present that data to the user
// Accept input from the user
// Send new/updated data back to the backend

// IIFE - immediately invoked function expression