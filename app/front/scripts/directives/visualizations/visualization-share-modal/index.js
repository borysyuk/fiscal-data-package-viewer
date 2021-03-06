'use strict';

var angular = require('angular');
var template = require('./template.html');

var osViewerService = require('../../../services/os-viewer');

angular.module('Application')
  .directive('visualizationShareModal', [
    '$location', '$browser', 'Configuration',
    function($location, $browser, Configuration) {
      return {
        template: template,
        replace: false,
        restrict: 'E',
        scope: {
          params: '='
        },
        link: function($scope, element) {
          var shareModal = element.find('.x-visualization-share-modal').modal({
            show: false
          });

          $scope.$on(Configuration.events.visualizations.showShareModal,
            function($event, visualization) {
              if (visualization && visualization.embed) {
                $scope.shareUrl = osViewerService.buildUrl(
                  $scope.params, {
                    visualization: visualization.embed,
                    protocol: $location.protocol(),
                    host: $location.host(),
                    port: $location.port(),
                    base: $browser.baseHref()
                  });
                shareModal.modal('show');
              }
            });
        }
      };
    }
  ]);
