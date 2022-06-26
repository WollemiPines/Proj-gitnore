
var APIKey = '59c84874ea24489395ac33e446edc44a';
var city;
var lat;
var long;
var cityDisp = $('#city-name')

var temp = $('#temp');
var wind =$('#wind');
var humidity = $('#humidity');
var uvIndex = $('#future_uvI0');


// click listener for the search bttn
$('#seachBttn').click(activateQueryURL);

// function activated when search bttn is pressed
function activateQueryURL(){

    // Re-define city value and display it above results
    city = $('input').val();
    cityDisp.html($('input').val()+ "   ");

    // Insert city name and API into the query url
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&q=" + city + "&appid=" + APIKey;

    // fetch data and display in JSON format
    fetch(queryURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
    
        // define variables lat and long based on json response
        lat = data.city.coord.lat
        long = data.city.coord.lon
        console.log(lat);
        console.log(long);

        // Because the previous URL cannot collect UV data, and this one does not search by city, the lat and lon are used to serach again for all the data
        var newqueryURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts&appid=" + APIKey + "&units=metric";
        fetch(newqueryURL)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)

        // Insert current temp data into apporpriate ID's
        temp.html(data.current.temp + " celcius")
        wind.html(data.current.wind_speed + " m/s");
        humidity.html(data.current.humidity + " %")
        uvIndex.html(data.daily[0].uvi)

        // Pulls data from the daily querry and inserts into the #future_... ID tags

        $('#future_temp1').html(data.daily[1].temp.day + " celcius")
        $('#future_temp2').html(data.daily[2].temp.day + " celcius")
        $('#future_temp3').html(data.daily[3].temp.day + " celcius")
        $('#future_temp4').html(data.daily[4].temp.day + " celcius")
        $('#future_temp5').html(data.daily[5].temp.day + " celcius")
        $('#future_temp6').html(data.daily[6].temp.day + " celcius")

        $('#future_wind1').html(data.daily[1].wind_speed + " m/s")
        $('#future_wind2').html(data.daily[2].wind_speed + " m/s")
        $('#future_wind3').html(data.daily[3].wind_speed + " m/s")
        $('#future_wind4').html(data.daily[4].wind_speed + " m/s")
        $('#future_wind5').html(data.daily[5].wind_speed + " m/s")
        $('#future_wind6').html(data.daily[6].wind_speed + " m/s")
    
        $('#future_humidity1').html(data.daily[1].humidity + " %")
        $('#future_humidity2').html(data.daily[2].humidity + " %")
        $('#future_humidity3').html(data.daily[3].humidity + " %")
        $('#future_humidity4').html(data.daily[4].humidity + " %")
        $('#future_humidity5').html(data.daily[5].humidity + " %")
        $('#future_humidity6').html(data.daily[6].humidity + " %")

    

        $('#future_uvI1').html(data.daily[1].uvi)
        $('#future_uvI2').html(data.daily[2].uvi)
        $('#future_uvI3').html(data.daily[3].uvi)
        $('#future_uvI4').html(data.daily[4].uvi)
        $('#future_uvI5').html(data.daily[5].uvi)
        $('#future_uvI6').html(data.daily[6].uvi)
        uvColorClass();

        $('#icon0').html(data.daily[0].weather[0].icon)
        $('#icon1').html(data.daily[1].weather[0].icon)
        $('#icon2').html(data.daily[2].weather[0].icon)
        $('#icon3').html(data.daily[3].weather[0].icon)
        $('#icon4').html(data.daily[4].weather[0].icon)
        $('#icon5').html(data.daily[5].weather[0].icon)
        $('#icon6').html(data.daily[6].weather[0].icon)
        iconFill();
        
    }

      )})};
   

// Use momentJS to set current date
let currentDate = $("#current-date");
let dynamicDate =  moment().format("DD-MM-YY");
currentDate.html(dynamicDate);

// Populate futrue date ID's
function popFutureDates(){

// Set variables
let futureDate1val = $("#future_date_1");
let futureDate2val = $("#future_date_2");
let futureDate3val = $("#future_date_3");
let futureDate4val = $("#future_date_4");
let futureDate5val = $("#future_date_5");
let futureDate6val = $("#future_date_6");

// set future date a number of days in the future
// apply formatting
// Update html content
  
    futureDate1 = moment().add(1, "days");
    futureDate1 = futureDate1.format("DD-MM-YYYY");
    futureDate1val.html(futureDate1);

    futureDate2 = moment().add(2, "days");
    futureDate2 = futureDate2.format("DD-MM-YYYY");
    futureDate2val.html(futureDate2);

    futureDate3 = moment().add(3, "days");
    futureDate3 = futureDate3.format("DD-MM-YYYY");
    futureDate3val.html(futureDate3);

    futureDate4 = moment().add(4, "days");
    futureDate4 = futureDate4.format("DD-MM-YYYY");
    futureDate4val.html(futureDate4);

    futureDate5 = moment().add(5, "days");
    futureDate5 = futureDate5.format("DD-MM-YYYY");
    futureDate5val.html(futureDate5);

    futureDate6 = moment().add(6, "days");
    futureDate6 = futureDate6.format("DD-MM-YYYY");
    futureDate6val.html(futureDate6);
}

popFutureDates();



function uvColorClass(){

    for(let i=0; i<7; i++){

        let uvSelector=$('#future_uvI'+i);

        if(uvSelector.html()<=2){
              uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI2');
            }
        if(uvSelector.html()>2 && uvSelector.html()<=5){
              uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI5');
            }
        if(uvSelector.html()>5 && uvSelector.html()<=7){
              uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI7');
            }   
        if(uvSelector.html()>7 && uvSelector.html()<=9){
              uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI9');
            } 
        if(uvSelector.html()>9 && uvSelector.html()<=11){
                uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI11');
            }
        if(uvSelector.html()>11){
                uvSelector.removeClass('uvI2 uvI5 uvI7 uvI9 uvI11 uvI12').addClass('uvI12');
         }
            console.log(uvSelector);
    }
}
function iconFill(){
    for(let i=0; i<7; i++){

        let iconSelector=$('#icon'+i);
    

        if(iconSelector.html()==='01d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/01d.png"></img>'));
        }
        if(iconSelector.html()==='02d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/02.png"></img>'));
        }
        if(iconSelector.html()==='03d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/03d.png"></img>'));
        }
        if(iconSelector.html()==='04d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/04d.png"></img>'));
        }
        if(iconSelector.html()==='09d'){
              iconSelector.html($('<img src="./Assets/Media/Icons/09d.png"></img>'));
        }
        if(iconSelector.html()==='10d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/10d.png"></img>'));
        }
        if(iconSelector.html()==='11d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/11d.png"></img>'));
        }
        if(iconSelector.html()==='13d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/13d.png"></img>'));
        }
        if(iconSelector.html()==='50d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/50d.png"></img>'));
        }
    }

}

