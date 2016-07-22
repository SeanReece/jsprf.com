angular.module('jsprf.controllers')

  .controller('benchmarkController', ['$scope', function ($scope) {
    var benchmarkSuite
    /**
     * Pass in the "winning" benchmarks from the benchmark.js suite and this will mark the winners in $scope.scripts
     * @param  {Array} winningScripts [description]
     * @return {[type]}                [description]
     */
    function highlightWinners (winningScripts) {
      $scope.$apply(function () {
        $scope.scripts.forEach(function (script) {
          var found = _.find(winningScripts, {'name': script.name})
          script.winner = !!found
        })
      })
    }
    
    /**
     * Just remove any properties from the scripts that were added during the last benchmark run
     */
    function resetBenchmarks() {
        $scope.scripts.forEach(function (script){
            delete script.errorMessage
            delete script.results
        })
    }

    /**
     * Starter benchmark scripts
     * @type {Array}
     */
    $scope.scripts = [
      {content: "/o/.test('Hello World!');"},
      {content: "'Hello World!'.indexOf('o') > -1;"},
      {content: "!!'Hello World!'.match(/o/);"}
    ]

    $scope.addScript = function () {
      $scope.scripts.push({})
    }

    $scope.removeScript = function (script) {
      $scope.scripts.splice($scope.scripts.indexOf(script), 1)
    }

    /**
     * Start the Benchmark.js suite
     * @return {[type]} [description]
     */
    $scope.runPerfs = function () {
      resetBenchmarks()
      benchmarkSuite = new Benchmark.Suite
      var count = 1
      // add tests
      $scope.scripts.forEach(function (script) {
        script.name = 'script' + count++
        benchmarkSuite.add(script.name, script.content, {
          onStart: function (event) {
            $scope.$apply(function () {
              script.inProgress = true
            })
          },
          onError: function (err) {
            $scope.$apply(function () {
              script.errorMessage = err.message.message
            })
          },
          onComplete: function (event) {
            $scope.$apply(function () {
              script.inProgress = false
              script.results = String(event.target)
            })
          }
        })
      })
      // add benchmark suite listeners
      benchmarkSuite
        .on('start', function() {
          $scope.inProgress = true
        })
        .on('cycle', function (event) {
          var winners = this.filter('fastest')
          highlightWinners(winners)
        })
        .on('complete', function() {
          $scope.inProgress = false
        })
        // run async
        .run({ 'async': true })
    }
    
    $scope.cancelPerfs = function () {
        benchmarkSuite.abort()
    }
  }])
