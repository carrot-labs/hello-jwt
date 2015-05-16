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

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $mdIconProvider) {

  /**
   * JWT - Http Interceptor
   */
  $httpProvider.interceptors.push('authInterceptor');
  // $httpProvider.inteceptors.push('authInterceptor');

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

  /**
   * Users route
   */
  $stateProvider.state('users', {
    url: '/users',
    templateUrl: 'views/users/index.html',
    controller: 'usersController'
  })

});

app.controller('loginController', function($scope, $http, $window, $log, AuthService) {
  $scope.credentials = {
    username: 'gui',
    password: 123
  };

  $scope.submit = submit;
  $scope.verify = verify;

  function submit(credentials) {
    var url = '/auth';
    var data = $scope.credentials;

    $http.post(url, data)
      .success(function(data, status) {
        $window.sessionStorage.token = data.token;
        AuthService.isLoggedIn = true;
      });
  }

  function verify() {
    $log.info(AuthService.isLoggedIn);
  }
});

app.controller('usersController', function($scope, $http) {
  $scope.users = [];

  $http.get('/api/users')
    .success(function(data) {
      $scope.users = data;
    });
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

/**
 * Auth Service
 */

app.service('AuthService', function() {
  this.isLoggedIn = false;
});


/**
 * Auth Inteceptor
 */
app.factory('authInterceptor', function($rootScope, $q, $window) {
  return {
    request: request,
    responseError: responseError
  };

  function request(config) {
    config.headers = config.headers || {};

    if($window.sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
    }

    return config;
  }

  function responseError(rejection) {
    if(rejection.status === 401) {
      $state.go('login');
    }

    return $q.reject(rejection);
  }
});