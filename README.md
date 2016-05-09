# What is MultipleDatePicker ?
MultipleDatePicker is an Angular directive to show a simple calendar allowing user to select multiple dates, a callback is called, you can specify some off days or already selected days.

# Get it
## NPM style
```
npm install multiple-date-picker --save
```

## Bower style
```
bower install multiple-date-picker --save
```

## Hipster style
```
git clone https://github.com/arca-computing/MultipleDatePicker.git
```

# Time to use it
Include at least css file

```html
<link rel="stylesheet" type="text/css" href="multiple-date-picker.css"/>
<script type="text/javascript" src="multipleDatePicker.min.js"></script>
```
    
If don't use something that gets dependencies for you, don't forget to include dependencies manually : Angular and MomentJS.

# Add it to your angular app
```javascript
var app = angular.module('myApp', ['multipleDatePicker']);
```

# Add it in your html
```html
<div>
    <multiple-date-picker></multiple-date-picker>
</div>
```


It will use the max width of it's parent, so If you want to reduce it specify a width (or use Bootstrap/Foundation).

```html
<div style="width:50%">
    <multiple-date-picker></multiple-date-picker>
</div>
```
    
# Options
##ngModel
Major change since previous version, we now use a ngModel attribute. Bind your array of moment dates, watch it to get notified when a date is selected/unselected.

```javascript
$scope.myArrayOfDates = [moment().date(4), moment().date(5), moment().date(8)];
    
$scope.$watch('myArrayOfDates', function(newValue, oldValue){
    if(newValue){
        console.log('my array changed, new size : ' + newValue.length);
    }
});
```
  
```html
<multiple-date-picker ngModel="myArrayOfDates"></multiple-date-picker>
```

##month
You can change current month when you want.

```javascript
$scope.myMonth = moment().add(3, 'MONTH');
```

```html
<multiple-date-picker month="myMonth" />
```

##First day of week
By default Monday will be the first day of week, but you can set calendar to use Sunday as first day of week

```html
<multiple-date-picker sunday-first-day="true" />
```
    

##Show previous/next month days
You can show previous and next months days with this option. You can combine all 3 options to fit your needs.

- showDaysOfSurroundingMonths : if true empty boxes will be filled, default is false
- cssDaysOfSurroundingMonths : applied css class to empty boxes. You can chain like 'myclass1 myclass2 myclass3', default is 'picker-empty'
- fireEventsForDaysOfSurroundingMonths : fire events on empty boxes, default is false

```html
<multiple-date-picker
    show-days-of-surrounding-months="true"
    fire-events-for-days-of-surrounding-months="true"
    css-days-of-surrounding-months="'picker-other-month-custom'"
    highlight-days="highlightDays"
/>
```

We use custom (and pretty ugly I know) css to customize previous/next months dates and highlight days

```css
.picker-day.picker-other-month-custom{
    background-color: #d17357;
    color: #fff;
}

.picker-day.picker-other-month-custom:hover{
    cursor: pointer;
    background-color: #ae5d4a;
    color: #fff;
}

.picker-day.picker-other-month-custom.picker-selected{
    background-color: #9c5244;
}

.picker-day.holiday{
    background-color: #00ffa2;
    color: #fff;
}

.picker-day.holiday.picker-selected{
    background-color: #00ae69;
    color: #fff;
}

.picker-day.holiday.picker-off{
    background-color: #00a267;
    color: #fff;
    cursor: default;
}

.picker-day.holiday:not(.picker-off):hover{
    background-color: #00e795;
    color: #fff;
}


.picker-day.birthday:not(.picker-selected){
    background-color: #ded100;
    color: #000;
}
```
    
##dayClick/dayHover
You can use this callback to check something and prevent the event to happen (click will select/unselect date, hover will trigger hover event on the date).

```javascript
$scope.checkSelection = function(event, date) {
    if(somethingWrongWithThisDate(date)){
        event.preventDefault();
        console.log('my click was prevented, want am I gonna do with my life ?');
    }
}
```
    
```html
<multiple-date-picker day-click="checkSelection"></multiple-date-picker>
```
    
    
##all-days-off
Disable all dates in the calendar, default is false

```html
<multiple-date-picker all-days-off="true"/>
```

##Highlight-days
This is an array containing dates you want to highlight, I can be a day-off like a bank day, holiday, your birthday, anything you want.

```javascript
{
    date: Timestamp/String/Moment, //anything usable with moment
    css: String //class applied, can be "class1" or "class1 class2 class3 ..."
    selectable: true/false,
    title: String //will be use in title attribute (show when cursor is hover)
}
```

The live demo represent the 2nd of month as holiday (not clickable), 14h a day off (not clickable) and the 25th is my birthday (not really, and clickable).

```javascript
$scope.highlightDays = [
    {date: moment().date(2).valueOf(), css: 'holiday', selectable: false,title: 'Holiday time !'},
    {date: moment().date(14).valueOf(), css: 'off', selectable: false,title: 'We don\'t work today'},
    {date: moment().date(25).valueOf(), css: 'birthday', selectable: true,title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
];
```

```html
<multiple-date-picker highlight-days="highlightDays"/>
```

And here the css used for this demo

```css
/*apply colors if not selected, if selected I want the default selected css*/
.picker-day.holiday:not(.picker-selected){
    background-color: #00ffa2;
    color: #fff;
}

/*if my holiday isn't clickable (it's the case in the demo)*/
.picker-day.holiday.picker-off{
    background-color: #00a267;
    color: #fff;
    cursor: default;
}

/*my birthday, is clickable*/
.picker-day.birthday:not(.picker-selected){
    background-color: #ded100;
    color: #000;
}
```
    
## Week-days-off
Those are days for every week that are not selectable. Sunday = 0, Monday = 1 ... Saturday = 6.

```html
<multiple-date-picker week-days-off="[0, 3]"/>
```
    
##disable-days-before
If filled will disable all days before this one (not included)

```javascript 
$scope.today = moment();
```

```html
<multiple-date-picker disable-days-before="today"/>
```
    
##disable-days-after
If filled will disable all days after this one (not included)

```javascript
$scope.today = moment();
```

```html
<multiple-date-picker disable-days-after="today"/>
```
    
##month-changed
The callback will be called everytime you change month (previous or next month). 
*Be aware that newMonth and oldMonth given to the callback is first day of month at midnight.*

This exemple shows how to pass a scope function that will prompt an alert with infos.

```javascript
$scope.logMonthChanged = function(newMonth, oldMonth){
    alert('new month : ' + newMonth.format('YYYY-M-DD') + ' || old month : ' + oldMonth.format('YYYY-M-DD'));
};
```

```html
<multiple-date-picker month-changed="logMonthChanged"/>
```
    
##disallow-back-past-months
If true the back button to go previous month will be disabled if you are on today's month, so you can't go in past month

```html
<multiple-date-picker disallow-back-past-months="true"/>
```
    
##disallow-go-futur-months
If true the back button to go next month will be disabled if you are on today's month, so you can't go the futur

```html
<multiple-date-picker disallow-go-futur-months="true"/>
```
    
##Emit reset
You can reset calendar using the factory multipleDatePickerBroadcast

click me to reset keeping daysSelected (clicReset)
click me to reset without keeping daysSelected (clicResetFull)

```javascript
$scope.clicReset = function(){
    multipleDatePickerBroadcast.resetOrder('myId');
};

$scope.clicResetFull = function(){
    $scope.selectedDays2 = []; //trigger a reset today but now is deprecated
    multipleDatePickerBroadcast.resetOrder('myId');
};
```

```html
<multiple-date-picker calendar-id="'myId'" days-selected="selectedDays2"/>
```
    
    
#Examples
##One day selection only
You want user to be able to select only one day, that's not a problem. Try to select multiple days, you'll not be able. Yeah we call it MAGIC !

```javascript
$scope.selectedDays3 = [];

$scope.oneDaySelectionOnly = function (event, date) {
    event.preventDefault();
    $scope.selectedDays3 = [];
    if(!date.selected){ //selected not affected yet, so if day is selected, selected property will be false
        $scope.selectedDays3.push(date);
    }
    multipleDatePickerBroadcast.resetOrder('myId2');
};
```

```html
<multiple-date-picker calendar-id="'myId2'" days-selected="selectedDays3" day-click="oneDaySelectionOnly"/>
```
    
##Let's get serious
You can (of course) use all options at the same time.
  
```html
<multiple-date-picker
    days-off="oneDayOff"
    days-selected="selectedDays"
    week-days-off="[0]"
    day-click="logInfos"/>
```
              
#Dependencies
The calendar uses 2 dependencies you must add to your project : angular of course and moment.js.

Because we use moment.js, you can load a language file and change the calendar language (days and months names), like this :

```javascript
moment.lang('fr');
var app = angular.module...
```

Week days order, week days names and month + year format cannot be changed with an option.

#What's next ?
We created this directive to have a simple calendar with multi-dates selection. We will keep it simple but any improvement is welcome.

