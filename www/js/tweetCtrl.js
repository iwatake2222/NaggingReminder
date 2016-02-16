app.controller('tweetCtrl', function($scope, $routeParams, $location, $ionicPopup) {
  if (angular.isDefined($routeParams.operation)) {
    $scope.operation = $routeParams.operation;
  }
  if (angular.isDefined($routeParams.title)) {
    $scope.title = $routeParams.title;
  }

  /* take picture when entered this screen */
  takePicture();

  $scope.tweet = function() {
    // todo: implement posting tweet

    var alertPopup = $ionicPopup.alert({
      title: 'Good Job !!',
      template: 'Your tweet was posted.'
    });
    alertPopup.then(function(res) {
      $location.path('/');
    });
  };

});

function takePicture() {
  if(typeof navigator.camera != 'undefined'){
    if(typeof navigator.camera.getPicture != 'undefined'){
      navigator.camera.getPicture(onSuccess, onFail);
    }
  }
}

function onSuccess(imageURI) {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = imageURI;
  image.onload = function(){
    var aspect = image.width/image.height;
    image.width = 200;
    image.height = image.width/aspect;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

function onFail(message) {
  alert('Failed: ' + message);
}
