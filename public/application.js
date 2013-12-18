(function() {
  window.cl = function() { if (window.console && console.log) { console.log(arguments); } };

  var App = angular.module("DR", []);

  App.directive("initialFocus", [function() {
    return function(scope, elm, attrs) {
      setTimeout(function() {
        elm[0].focus();
      }, 0);
    };
  }]);

  App.directive("selectAllOnFocus", [function() {
    return function(scope, elm, attrs) {
      elm.on('focus', function() {
        this.setSelectionRange(0, 9999);
      });
    };
  }]);

  App.controller("SearchCtrl", ['$scope', '$http', '$q', '$timeout', function($scope, $http, $q, $timeout) {

    var canceller;

    $timeout(function() {
      var hash = window.location.hash;
      if (hash !== "") { $scope.q = hash.replace("#",""); }
    }, 0);

    $scope.$watch('q', function(value, oldValue) {
      if (value !== oldValue) {
        window.location.hash = value;

        if (canceller) { canceller.resolve(); }

        _.each(['results', 'uri', 'filename'], function(key) { delete $scope[key]; });

        if (value === "") { return; }

        var path = "/proxy?path=/Bundle?Title=$like('" + encodeURIComponent(value) + "')";
        canceller = $q.defer();
        $scope.loading = true;
        $http.get(path, { timeout: canceller.promise }).success(function(results) {
          $scope.results = results.Data;
          delete canceller;
          $scope.loading = false;
        });
      }
    });

    $scope.loadProgramsFor = function(bundle) {
      if (bundle.programs) { delete bundle.programs; return; }

      var path = "/proxy?path=/ProgramCard?Relations.Slug=$eq('" + bundle.Slug + "')&limit=$eq(100)";
      $scope.loading = true;
      $http.get(path).success(function(results) {
        bundle.programs = extendVideoLinks(results.Data);
        $scope.loading = false;
      });
    };

    $scope.play = function(program, event) {
      event.preventDefault();

      $scope.loading = true;
      $http.get('/proxy?path=' + program.video.Uri).success(function(links) {
        $scope.loading = false;
        var ios = _.select(links.Links, function(link) {
          if (link.Target === 'Ios') return true;
          return false;
        });
        $scope.filename = program.Slug;
        $scope.uri = _.first(ios).Uri;
      });
    };

    function extendVideoLinks(programs) {
      _.each(programs, function(program) {
        _.each(program.Assets, function(asset) {
          if (asset.Kind === 'VideoResource') {
            program.video = asset;
            return false;
          }
        });
      });
      return programs;
    }

  }]);

  window.App = App;
})();
