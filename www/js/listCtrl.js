app.controller('listCtrl', function($scope, $location){
  /* bind const */
  $scope.REPEAT_EVERYDAY = REPEAT_EVERYDAY;
  $scope.REPEAT_WEEKLY = REPEAT_WEEKLY;
  $scope.REPEAT_SPECIFIC = REPEAT_SPECIFIC;
  $scope.STATUS_NOT_WORKING = STATUS_NOT_WORKING;
  $scope.STATUS_COMING = STATUS_COMING;
  $scope.STATUS_WORKING = STATUS_WORKING;
  $scope.STATUS_FORGET_START = STATUS_FORGET_START;
  $scope.STATUS_FORGET_END = STATUS_FORGET_END;

  /* get data */
  $scope.items = dataManager.getAllSorted();


});
