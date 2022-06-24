
var APIKey = '59c84874ea24489395ac33e446edc44a';
var city;
var cityDisp = $('#city-name')
console.log(city);




$('#seachBttn').click(activateQueryURL);

function activateQueryURL(){
    city = $('input').val();
    cityDisp.html($('input').val());
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)}
    )};


let currentDate = $("#current-date");
let dynamicDate =  moment().format("DD-MM-YY");
var new_date = moment(dynamicDate, "DD-MM-YY").add(1, 'days')
let noDays = 0

function popFutureDates(){

let futureDate1val = $("#future_date_1");
let futureDate2val = $("#future_date_2");
let futureDate3val = $("#future_date_3");
let futureDate4val = $("#future_date_4");
let futureDate5val = $("#future_date_5");

    futureDate1= moment();
    futureDate1 = futureDate1.add(1, "days");
    futureDate1 = futureDate1.format("DD-MM-YYYY");
    futureDate1val.html(futureDate1);

    futureDate2= moment();
    futureDate2 = futureDate2.add(2, "days");
    futureDate2 = futureDate2.format("DD-MM-YYYY");
    futureDate2val.html(futureDate2);

    futureDate3= moment();
    futureDate3 = futureDate3.add(3, "days");
    futureDate3 = futureDate3.format("DD-MM-YYYY");
    futureDate3val.html(futureDate3);

    futureDate4= moment();
    futureDate4 = futureDate4.add(4, "days");
    futureDate4 = futureDate4.format("DD-MM-YYYY");
    futureDate4val.html(futureDate4);

    futureDate5= moment();
    futureDate5 = futureDate5.add(5, "days");
    futureDate5 = futureDate5.format("DD-MM-YYYY");
    futureDate5val.html(futureDate5);
}

popFutureDates();

currentDate.html(dynamicDate);
