(function () {
  'use strict';

  angular
    .module('app.landing', [])
    .config(config);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'scripts/app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'landingCtrl'
      });
  }

})();
