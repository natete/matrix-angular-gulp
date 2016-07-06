(function() {
  'use strict';
  angular
    .module('app.core', [])
    .filter('reverse',[function(){
      return function(string){
        return string.split('').reverse().join('');
      }
  }]);
}());
