/**
 * Application prototype
 */
var app = angular.module('app', [
  'ngMaterial',
  'ui.router'
]);

/**
 * Application config
 */

app.config(function($stateProvider, $urlRouterProvider, $mdIconProvider) {

  /**
   * Provides the icons
   */
  $mdIconProvider
    .defaultIconSet('assets/icons/core-icons.svg', 24);

  /**
   * Default route
   */
  $urlRouterProvider.otherwise('/home');

  /**
   * Home route
   */
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'views/home/index.html'
  });

  /**
   * Home List route
   */
  $stateProvider.state('home.list', {
    url: '/list',
    templateUrl: 'views/home/list.html',
    controller: function($scope, $log) {
      $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];

      $scope.alert = function(msg) {
        $log.info(msg);
      }
    }
  });

  /**
   * Home Paragraph route
   */
  $stateProvider.state('home.paragraph', {
    url: '/paragraph',
    templateUrl: 'views/home/paragraph.html'
  });

  /**
   * Login route
   */
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/auth/login.html',
    controller: 'loginController'
  });

  /**
   * About route
   */
  $stateProvider.state('about', {
    url: '/about',
    views: {
      '': { templateUrl: 'views/about/index.html'},

      'columnOne@about': { template: 'Look I am a column'},

      'columnTwo@about': {
        templateUrl: 'views/about/table-data.html',
        controller: 'scotchController'
      }
    }
  });

});

app.controller('loginController', function($scope, $http, $log) {
  $scope.credentials = {};

  $scope.submit = submit;

  function submit(credentials) {
    $log.info(credentials);
  }

});

app.controller('scotchController', function($scope) {
  $scope.selected = {};

  $scope.scotches = [{
    name: 'Macallan 12',
    price: 50
  }, {
    name: 'Chivas Regal Royal Salute',
    price: 10000
  }, {
    name: 'Glenfiddich 1937',
    price: 20000
  }];

  $scope.select = function(scotch) {
    $scope.selected = scotch;
  };

  $scope.unselect = function() {
    $scope.selected = {};
  };
});
