app.controller('detailsCtrl', function($scope, $routeParams, $location, $ionicPopup) {
  /* bind const */
  $scope.REPEAT_EVERYDAY = REPEAT_EVERYDAY;
  $scope.REPEAT_WEEKLY = REPEAT_WEEKLY;
  $scope.REPEAT_SPECIFIC = REPEAT_SPECIFIC;
  $scope.DATE_WEEKLY_MONDAY = DATE_WEEKLY_MONDAY;
  $scope.DATE_WEEKLY_TUESDAY = DATE_WEEKLY_TUESDAY;
  $scope.DATE_WEEKLY_WEDNESDAY = DATE_WEEKLY_WEDNESDAY;
  $scope.DATE_WEEKLY_THURSDAY = DATE_WEEKLY_THURSDAY;
  $scope.DATE_WEEKLY_FRIDAY = DATE_WEEKLY_FRIDAY;
  $scope.DATE_WEEKLY_SATURDAY = DATE_WEEKLY_SATURDAY;
  $scope.DATE_WEEKLY_SUNDAY = DATE_WEEKLY_SUNDAY;
  $scope.STATUS_NOT_WORKING = STATUS_NOT_WORKING;
  $scope.STATUS_COMING = STATUS_COMING;
  $scope.STATUS_WORKING = STATUS_WORKING;
  $scope.STATUS_FORGET_START = STATUS_FORGET_START;
  $scope.STATUS_FORGET_END = STATUS_FORGET_END;

  /* get parameters from url */
  if (angular.isDefined($routeParams.id)) {
    $scope.id = $routeParams.id;
    /* get data */
    $scope.item = dataManager.getByID($scope.id);
    $scope.isNew = "false";
  } else {
    $scope.item = dataManager.create();
    $scope.id = $scope.item.id;
    $scope.isNew = "true";
  }

  // todo: fix. unable to bind duration by default
  setTimeout(function() {
    var elemDuration = document.getElementById("duration");
    if(elemDuration) {
      options = elemDuration.getElementsByTagName('option');
      for(i = 0; i < options.length; i++){
        if(options[i].value == $scope.item.duration){
           options[i].selected = true;
           break;
        }
      }
    }
  }, 50);

  // generate date object to bind
  $scope.dateSpecificObject = new Date( $scope.item.dateSpecific )


  /* events */
  $scope.save = function() {
    /* convert date */
    //alert($scope.dateSpecificObject);   // didn't work...
    var elemDate = document.getElementById("date_specific");
    if(elemDate) {
      // rawDate is the local date user wants to use
      // but, rawDate does not have time zone info.
      var rawDate = elemDate.value;
      // when create newDate, rawDate is considered UTC
      var utcDate = new Date(rawDate);
      // so, need to add offset by time difference
      var timeDiffSec = new Date().getTimezoneOffset() * 60;
      var inputDate = new Date(utcDate.getTime() + timeDiffSec*1000);
      $scope.item.dateSpecific = inputDate;
      $scope.item.dateSpecificDisplay = rawDate;
    }

    /* save item */
    dataManager.save($scope.item);

    $location.path('/list/');
  };

  $scope.delete = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Are you sure you want to delete?',
      template: 'Delete: ' + $scope.item.title
    });
    confirmPopup.then(function(res) {
      if(res) {
        dataManager.delete($scope.item.id);
        $location.path('/list/');
      } else {
      }
    });
  };

  $scope.start = function() {
    var updateStatus = function(operation) {
      if($scope.item.time != 0) {$scope.item.status = STATUS_WORKING;}
      $scope.item.record.unshift("Start: " + new Date().toLocaleString());
      dataManager.save($scope.item);
    }

    var confirmPopup = $ionicPopup.show({
      title: 'Good luck !!',
      template: 'Post a tweet?',
      buttons: [{
        text: 'Cancel',
        type: 'button-default',
        onTap: function(e) {} }, {
        text: 'No',
        type: 'button-negative',
        onTap: function(e) {updateStatus(); $location.path('/');} }, {
        text: 'Yes',
        type: 'button-positive',
        onTap: function(e) {updateStatus(); $location.path('/tweet/' + 'started/' + $scope.item.title);} }]
    });
  };

  $scope.finish = function() {
    var updateStatus = function(operation) {
      $scope.item.status = STATUS_NOT_WORKING;
      $scope.item.record.unshift("Finish: " + new Date().toLocaleString());
      dataManager.save($scope.item);
    }

    var confirmPopup = $ionicPopup.show({
      title: 'Good job !!',
      template: 'Post a tweet?',
      buttons: [{
        text: 'Cancel',
        type: 'button-default',
        onTap: function(e) {} }, {
        text: 'No',
        type: 'button-negative',
        onTap: function(e) {updateStatus(); $location.path('/');} }, {
        text: 'Yes',
        type: 'button-positive',
        onTap: function(e) {updateStatus(); $location.path('/tweet/' + 'finished/' + $scope.item.title);} }]
    });

  };

  /* ionic-timepicker */
  $scope.timePickerObject = {
    //inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    inputEpochTime: $scope.item.time,
    step: 15,  //Optional
    format: 12,  //Optional
    titleLabel: 'Set Start Time',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      timePickerCallback(val);
    }
  };

  function timePickerCallback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);

      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      $scope.item.time = val;
      $scope.timePickerObject.inputEpochTime = $scope.item.time;

    }
  }


});

