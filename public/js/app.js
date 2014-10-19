'use strict';
angular.module('Admin', ['ngMaterial', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.dust'
  })
  .when('/movies', {
    templateUrl: 'templates/movie.dust'
  })
  .when('/theater', {
    templateUrl: 'templates/theater.dust'
  })
  .otherwise({
    redirectTo: '/',
    templateUrl: 'templates/home.dust'
  });
}])

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
      caption: 'Inicio',
      url: '/'
    },
    {
      caption: 'Películas',
      url: '/movies'
    },
    {
      caption: 'Cines',
      url: '/theater'
    }
  ];

  $scope.close = function(title) {
    titleService.prepForBroadcast(title);
    $mdSidenav('left').close();
  };
});
