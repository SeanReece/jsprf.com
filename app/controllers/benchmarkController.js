angular.module('jsprf.controllers')

  .controller('benchmarkController', ['$scope', function ($scope) {
    $scope.editMode = true
    var benchmarkSuite
    /**
     * Pass in the "winning" benchmarks from the benchmark.js suite and this will mark the winners in $scope.scripts
     * @param  {Array} winningScripts [description]
     * @return {[type]}                [description]
     */
    function highlightWinners (suite) {
      var completed = suite.filter('successful')
      var winners = suite.filter('fastest')
      var losers = suite.filter('slowest')

      $scope.$apply(function () {
        if (completed.length > 1) {
          $scope.scripts.forEach(function (script) {
            if (script.results) {
              var found = _.find(winners, {'name': script.name})
              if (found) {
                script.winner = true
                script.factor = (script.results.hz / losers[0].hz).toFixed(2) + "x faster"
              }
              else {
                script.loser = !!_.find(losers, {'name': script.name})
                script.factor = (script.results.hz / winners[0].hz).toFixed(2) + "x slower"
              }
            }
          })
        }
      })
    }

    /**
     * Just remove any properties from the scripts that were added during the last benchmark run
     */
    function resetBenchmarks() {
        $scope.scripts.forEach(function (script){
            delete script.error
            delete script.results
        })
    }

    /**
     * Starter benchmark scripts
     * @type {Array}
     */
    $scope.scripts = [
      {content: "/o/.test('Hello World!');", name: "script1"},
      {content: "'Hello World!'.indexOf('o') > -1;", name: "script2"},
      {content: "!!'Hello World!'.match(/o/);", name: "script3"}
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
      $scope.editMode = false
      resetBenchmarks()
      benchmarkSuite = new Benchmark.Suite
      var count = 1
      // add tests
      $scope.scripts.forEach(function (script) {
        script.name = script.name || 'script' + count
        count++
        benchmarkSuite.add(script.name, script.content, {
          onStart: function (event) {
            $scope.$apply(function () {
              script.inProgress = true
            })
          },
          onError: function (err) {
            $scope.$apply(function () {
              script.error = err.message.message
            })
          },
          onComplete: function (event) {
            $scope.$apply(function () {
              var bench = event.target
              script.inProgress = false
              script.ops = Benchmark.formatNumber(bench.hz.toFixed(bench.hz < 100 ? 2 : 0)) + ' ops/sec (\xb1' + bench.stats.rme.toFixed(2) + '%)'
              script.results = bench
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
          highlightWinners(this)
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
    $scope.switchToEdit = function () {
        $scope.editMode = true
    }
  }])
