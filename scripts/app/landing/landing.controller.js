(function () {
  'use strict';

  angular
    .module('app.landing')
    .controller('LandingController', LandingController);

  /* @ngInject */
  function LandingController () {
    var vm = this;
    
    vm.message = 'Hi Matrix!!!'
  }

})();
