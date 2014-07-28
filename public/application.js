(function() {
  'use strict';

  var module = angular.module("DR", ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'SearchCtrl',
      templateUrl: 'templates/search.html'
    });
  });

  module.controller("SearchCtrl", function($scope, $http, $location, $q, $timeout) {

    var canceller;

    // Timeout to make it change from undefined to search.q
    $timeout(function() {
      $scope.q = $location.search().q;
    }, 0);

    $scope.$watch('q', function(value, oldValue) {
      if (!value) return;

      $location.search({q: value});

      getBundle($scope.q).then(function(bundle) {
        $scope.results = bundle;
      });
    });

    $scope.loadProgramsFor = function(bundle) {
      getPrograms(bundle).then(function(programs) {
        bundle.programs = extendVideoLinks(programs);
      });
    };

    $scope.getPlaylistFor = function(program, event) {
      event.preventDefault();

      getPlaylist(program).then(function(playlist) {
        $scope.file = {
          filename: program.Slug,
          uri: playlist
        };
      });
    };

    function getBundle(q) {
      if (canceller) canceller.resolve();

      if (q === '') return;

      $scope.loading = true;
      canceller = $q.defer();

      var path = "/proxy?path=/Bundle?Title=$like('" +
        encodeURIComponent(q) + "')";
      return $http.get(path, { timeout: canceller.promise }).then(function(resp) {
        $scope.loading = false;
        canceller = undefined;
        return resp.data.Data;
      });
    }

    function getPrograms(bundle) {
      $scope.loading = true;
      var path = "/proxy?path=/ProgramCard?Relations.Slug=$eq('" + bundle.Slug + "')&limit=$eq(100)";
      return $http.get(path).then(function(resp) {
        $scope.loading = false;
        return resp.data.Data;
      });
    }

    function getPlaylist(program) {
      $scope.loading = true;
      return $http.get('/proxy?path=' + program.video.Uri).then(function(resp) {
        $scope.loading = false;
        var match = _.select(resp.data.Links, function(link) {
          return (link.Target === 'HLS' && link.FileFormat === 'mp4');
        });
        return _.first(match).Uri;
      });
    }

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

  });

  module.directive("initialFocus", function($timeout) {
    return function(scope, elm, attrs) {
      document.addEventListener('DOMLoaded', function() {
        elm[0].focus();
        elm[0].setSelectionRange(0, 9999);
      });
    };
  });

  module.directive('selectAllOnFocus', function($timeout) {
    return function(scope, elm, attrs) {
      elm.on('focus', function(event) {
        $timeout(function() {
          elm[0].setSelectionRange(0, 9999);
        }, 0);
      });
    };
  });

  window.module = module;
})();
