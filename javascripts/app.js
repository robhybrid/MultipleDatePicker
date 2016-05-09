var app = angular.module('demoApp', ['multipleDatePicker']);

app.controller('demoController', ['$scope', function ($scope) {
    $scope.today = moment();

    $scope.myMonth = moment().add(3, 'MONTH');

    $scope.highlightDays = [
        {date: moment().date(2), css: 'holiday', selectable: false,title: 'Holiday time !'},
        {date: moment().date(14), css: 'off', selectable: false,title: 'We don\'t work today'},
        {date: moment().date(25), css: 'birthday', selectable: true,title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
    ];

    $scope.selectedDays2 = [moment().date(4), moment().date(5), moment().date(8)];
    $scope.selectedDays3 = [];

    $scope.myArrayOfDates = [moment().date(4), moment().date(5), moment().date(8)];

    $scope.$watch('myArrayOfDates', function(newValue){
        if(newValue){
            console.log('my array changed, new size : ' + newValue.length);
        }
    }, true);

    $scope.logMonthChanged = function(newMonth, oldMonth){
        alert('new month : ' + newMonth.format('YYYY-M-DD') + ' || old month : ' + oldMonth.format('YYYY-M-DD'));
    };


    $scope.oneDaySelectionOnly = function (event, date) {
        $scope.selectedDays3.length = 0;
    };

}]);
