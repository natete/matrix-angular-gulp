(function() {
  'use strict';

  describe('Filters', function(){ //describe your object type
    beforeEach(module('app.core')); //load module
    describe('reverse',function(){ //describe your app name
        var reverse;
        beforeEach(inject(function($filter){ //initialize your filter
            reverse = $filter('reverse',{});
        }));
        it('Should reverse a string', function(){  //write tests
            expect(reverse('rahil')).toBe('lihar'); //pass
            expect(reverse('don')).toBe('nod'); //pass
            // expect(reverse('jam')).toBe('oops'); // this test should fail
            // expect(true).toBe(true);
        });
    });
  });
}());
