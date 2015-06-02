(function() {
  'use strict';

  var module = angular.module("dldr", []);

  module.controller("SearchCtrl", function($scope, $http, $location, $q, $timeout) {

    var canceller;

    // Timeout to make it change from undefined to search.q
    $scope.q = $location.hash();

    $scope.$watch('q', function(value, oldValue) {
      if (typeof value === undefined) return;

      $location.hash(value);

      if (value === '') return;

      getBundle($scope.q).then(function(bundle) {
        $scope.results = bundle;
      });
    });

    $scope.loadProgramsFor = function(bundle, event) {
      event.preventDefault();

      getPrograms(bundle).then(function(programs) {
        bundle.programs = extendVideoLinks(programs);
      });
    };

    $scope.getPlaylistFor = function(program, event) {
      event.preventDefault();

      getLinks(program).then(function(playlist) {
        $scope.links = _(playlist).sortBy('Bitrate').reverse().valueOf();
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

    function getLinks(program) {
      $scope.loading = true;
      $scope.program = program;
      try {
        $scope.imageUrl = _(program.Assets).find(function(a) {
          return a.Kind === 'Image' && a.ContentType === 'image/jpeg';
        }).valueOf().Uri;
      } catch(e) {}
      return $http.get('/proxy?path=' + program.video.Uri).then(function(resp) {
        console.log(resp.data.Links)
        $scope.debug = resp.data.Links
        $scope.loading = false;
        return _.select(resp.data.Links, function(link) {
          return (link.Target === 'Download' && link.FileFormat === 'mp4');
        });
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

  window.module = module;
})();
