var app = angular.module("StickersApp", []);


app.controller("MainController", ["$scope",
  function($scope) {

    // Add the array of sticker urls to scope
    $scope.stickerUrls = [
      "img/bee.png",
      "img/glasses.png",
      "img/hat.png",
      "img/mustache.svg",
      "img/owl.png",
      "img/pikachu.png"
    ];

  }]);

app.directive("draggableSticker", function($compile) {
  return {
    restrict: "E",
    scope: {
      url: "@"
    },
    replace: true,
    template: "<img class='sticker sticker-draggable' ng-src='{{url}}'></img>"
  }
});

app.directive("stickerInDock", function($compile) {
  return {
    restrict: "E",
    scope: {
      url: "@"
    },
    replace: true,
    template: "<img class='sticker sticker-in-dock' ng-src='{{url}}'/>",

    // Upon clicking the stickerInDock, convert it to a draggableSticker and
    // add a new stickerInDock in its place
    link: function($scope, $element, $attrs) {
      $element.on("mousedown", function createNewDockSticker(event) {
        $element.removeClass("sticker-in-dock");
        $element.addClass("sticker-is-dragging");
        $element.addClass("sticker-draggable");

        var newDockSticker = $compile("<sticker-in-dock url='" + $scope.url + "' ></sticker-in-dock>")($scope);
        $element.parent().append(newDockSticker);

        $element.off("mousedown");
      });
    }
  }
});
