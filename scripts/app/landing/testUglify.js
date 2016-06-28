/**
 *
 * Copyright (c) 2014 Hewlett-Packard.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Hewlett-Packard, Inc.
 *
 * Source code style and conventions follow the "ISS Development Guide Java
 * Coding Conventions" standard dated 01/12/2011.
 */

/**
 * Login controller
 * @param {type} Login module
 * @author Jose Figueruela <jfigueruela@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Ignacio Gonzalez <igonzalez@emergya.com>
 */

(function () {
  define(['./login.module'], function (module) {
    'use strict';

    angular
      .module(module)
      .controller('LoginController', LoginController);


    /* @ngInject */
    function LoginController($state, $ionicHistory, ChannelsConnectorFactory, LoginService, ConstantsService,
      socialPlatforms,
      NotifierFactory, ProfileFactory, ToastFactory, isFirstTime, ModalToastFactory) {

      var vm = this;

      vm.title = 'Login';

      /** Defining public methods **/
      vm.login = login;
      vm.goToSlide = goToSlide;
      vm.getPasskey = getPasskey;

      // Social login platforms supported.
      vm.socialPlatforms = socialPlatforms;

      vm.userLogin = {};
      vm.error = undefined;

      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.disableScroll(true);
      }

      // @amoron: needed. References saved globally
//      window.cordovaOauth = $cordovaOauth;
//      window.http = $http;

      var initialSlide = 0;
      var LOGIN_FORM_SLIDE = 2;

      activate();
      function activate() {
        if (!isFirstTime) {
          initialSlide = LOGIN_FORM_SLIDE;
        }

        vm.options = {
          pagination: false,
          initialSlide: initialSlide,
          onTransitionEnd: function (slider) {
            lockSwipe(slider);
          }
        };

      }

      /**
       * Performs login action in the given social platform.
       * @param {object} socialPlatform the social platform to be used when logging. Undefined to log in with mediabin
       */
      function login(socialPlatform) {
        vm.error = undefined;
        if (socialPlatform) { // Log in with a social platform.

          ChannelsConnectorFactory
            .loginWithSocial(socialPlatform)
            .then(initApp)
            .catch(function (error) {
              vm.error = {message: 'login.errorSocialSignIn', values: {socialPlatform: socialPlatform.name}};
            });

        } else { // Log in with mediabin

          LoginService.login(vm.userLogin)
            .then(initApp)
            .catch(function (error) {
              vm.error = {message: 'login.errorSignIn'};
            });
        }
      }

      function initApp() {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        ProfileFactory.clearProfile();
        NotifierFactory.init();
        window.cordova.plugins.Keyboard.disableScroll(false);
        $state.go(ConstantsService.ACCOUNT_SETUP_PROFILE);
      }

      function goToSlide(index) {
        unlockSwipe();
        vm.slider.slideTo(index);
      }

      function getPasskey(email) {
        LoginService.getPasskey(email)
          .then(function () {
            vm.passkeyEmail = undefined;
            vm.userLogin.username = email;
            goToSlide(2);

            //ToastFactory.addSuccessToast('easyLogin.emailSent', 'ion-happy-outline');
            ModalToastFactory.openSuccess('easyLogin.emailSent', 'ion-happy-outline');

          })
          .catch(function () {

            //ToastFactory.addErrorToast('profile.errorUpdating', 'ion-sad-outline');
            ModalToastFactory.openError('profile.errorUpdating', 'ion-sad-outline');

          });
      }

      function lockSwipe(slider) {
        if (slider.activeIndex === LOGIN_FORM_SLIDE) {
          slider.lockSwipeToNext();
          slider.lockSwipeToPrev();
        }
      }

      function unlockSwipe() {
        vm.slider.unlockSwipeToNext();
        vm.slider.unlockSwipeToPrev();
      }
    }
  });
})();
