'use strict';
angular.module('Admin', ['ngMaterial'])

.factory('titleService', function($rootScope) {
  var titleService = {};
  titleService.title = '';
  titleService.prepForBroadcast = function(title) {
    this.title = title;
    this.broadcastItem();
  };
  titleService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };
  return titleService;
})

.controller('AppCtrl', function($scope, $timeout, $mdSidenav, titleService) {
  $scope.title = 'Inicio';
  $scope.$on('handleBroadcast', function() {
    $scope.title = titleService.title;
  });

  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle();
  };
})

.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, titleService) {
  $scope.main = [
    {
      caption: 'Inicio'
    },
    {
      caption: 'Películas'
    },
    {
      caption: 'Cines'
    }
  ];

  $scope.close = function(title) {
    titleService.prepForBroadcast(title);
    $mdSidenav('left').close();
  };
});
