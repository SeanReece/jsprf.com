angular.module('jsprf', [
  'jsprf.controllers',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/benchmark");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "index.html"
    })
    .state('benchmark', {
      url: "/benchmark",
      templateUrl: "app/views/benchmark.html",
      controller: "benchmarkController"
    })
});

angular.module('jsprf.controllers', []);
angular.module('jsprf.services', []);
