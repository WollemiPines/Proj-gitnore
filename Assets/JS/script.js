
// Global variables
// Open weather api variables
let APIKey = '59c84874ea24489395ac33e446edc44a';
let city;
let cityHist;
let currentList;
let lat;
let long;
let cityDisp = $('#city-name')
// weather condition variables 
let temp = $('#temp');
let wind =$('#wind');
let humidity = $('#humidity');
let uvIndex = $('#future_uvI0');
// local storage variables
let history = $('#history');
let historyEl;
// moment.js variables
let futureDateval;
let futureDate;

let searchTerm;
var searchHistoryArray = [];
clearBttn = $('#clearBttn');


// click listener for the search bttn
$('#searchBttn').click(activateQueryURL);

// Log search history to local storage
function logHistory() {
    searchTerm= $('input').val();
    searchHistoryArray.push(searchTerm);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
};

// Display search history to page 
function displaySearchHistory() {
    let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
    console.log(searchHistoryArray);
    $('history').html("");
    clearBttn.attr("class", "show");
    for (let i = 0; i < searchHistoryArray.length; i++) {
        let searchHistoryItem = $("li");
        searchHistoryItem.text(searchHistoryArray[i]);
        history.append(searchHistoryItem);
    }
};

// event listener for clear search history
clearBttn.click(clearSearchHistory);

// function to clear search history

function clearSearchHistory() {
    localStorage.clear();
    searchHistoryArray = [];
    history.html("");
    clearBttn.attr("class", "hide");
};

// function activated when search bttn is pressed
function activateQueryURL(){

    // Local storage - search history
    logHistory();
    displaySearchHistory();

   

    // Re-define city value and display it above results
    city = $('input').val();

    // Insert city name and API into the query url
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=524901&q=" + city + "&appid=" + APIKey;

    // fetch data and display in JSON format
    fetch(queryURL)
    .then(function (response) {
        if(response.status=== 200){
            cityDisp.html($('input').val()+ "   ");  
        }
        else{
            cityDisp.html("Not a valid input  ");
        }
        return response.json()
       
      })
      .then(function (data) {
       
    
        // define variables lat and long based on json response
        lat = data.city.coord.lat
        long = data.city.coord.lon
       

        // Because the previous URL cannot collect UV data, and this one does not search by city, the lat and lon are used to serach again for all the data
        let newqueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts&appid=" + APIKey + "&units=metric";
        fetch(newqueryURL)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
           

        // Insert current temp data into apporpriate ID's
        temp.html(data.current.temp + " celcius")
        wind.html(data.current.wind_speed + " m/s");
        humidity.html(data.current.humidity + " %")
        uvIndex.html(data.daily[0].uvi)

        // Pulls data from the daily querry and inserts into the #future_... ID tags
        for(let i=0; i<=6; i++){
            $('#future_temp'+i).html(data.daily[i].temp.day + " celcius")
            $('#future_wind'+i).html(data.daily[i].wind_speed + " m/s")
            $('#future_humidity'+i).html(data.daily[i].humidity + " %")
            $('#future_uvI'+i).html(data.daily[i].uvi)
            uvColorClass();
            $('#icon'+i).html(data.daily[i].weather[0].icon)
            iconFill();
              }
            }
             )}
    )};
   

// Use momentJS to set current date
let currentDate = $("#current-date");
let dynamicDate =  moment().format("DD-MM-YY");
currentDate.html(dynamicDate);

// Populate future date ID's
function popFutureDates(){

// Set variables
for (let i=1; i<=6; i++){
    // set future date a number of days in the future
 futureDateval = $("#future_date_"+i);
 futureDate = moment().add(i, "days");
 // apply formatting
 futureDate = futureDate.format("DD-MM-YYYY");
// Update html content
 futureDateval.html(futureDate);

}
}

popFutureDates();


// change UV colours based on number value
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
          
    }
}

// change icons depending on weather conditions
function iconFill(){
    for(let i=0; i<7; i++){
        let iconSelector=$('#icon'+i);

        if(iconSelector.html()==='01d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/01d.png"></img>'));
        }
        if(iconSelector.html()==='02d'){
            iconSelector.html($('<img src="./Assets/Media/Icons/02d.png"></img>'));
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

$('.historyElBttn').click(searchHistoryBttn);
function searchHistoryBttn(){
    city=$('.historyElBttn').html();
    activateQueryURL()
}