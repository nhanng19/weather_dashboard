// Set variables for five day cards

var current = $('#current');
var city = $('#City');
var icon =$('#icon');
var temp = $('#temp');
var wind = $('#wind');
var humidity = $('#humidity');
var uv = $('#uv');
var sunrise =$('#sunrise');
var sunset =$('#sunset');
var fiveDay =$('#fiveDay');
var search = $('#searchBtn');
let inputEl = $('#userInput');
var longitude ='';
var latitude =''

// Add event listener when user press enter 

inputEl.keypress(function(event) {
    if (event.keyCode === 13) {
        currentData(inputEl.val())
        addToRecentSearches(inputEl.val());
    }
});
// search.on('click' , currentData, addToRecentSearches);

search.on("click", function(event) {
    event.preventDefault();;
    var input = inputEl.val()
    if (input == "") {
      return;
    } else {
      currentData(input);
      addToRecentSearches(input);
    }
  });


// Load Recent Searches from Local Storage
  getRecentSearches();

// Search History 

var citiesData = [];

function addToRecentSearches(input) {
$("#recent-searches").show();

// Create Element
var newCity = $("<li>");
newCity.addClass("list-group-item");
newCity.text(input);
// Append to List
$("#recent-searches-list").prepend(newCity);

var cityObj = {
input: input
};

citiesData.push(cityObj);

// Save to localStorage
localStorage.setItem("searches", JSON.stringify(citiesData));
}
  
// Onclick listener to search list items
$("#recent-searches-list").on("click", "li.list-group-item", function() {
var history = $(this).text();
  
  weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ history +'&units=imperial&appid=35d94501369d43748d1a83d5811f76e7';
  console.log(weatherURL);
  fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
      longitude = data.coord.lon;
      latitude = data.coord.lat;
      var iconCode=data.weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
  fetch(iconurl)
      .then(data => {
          icon.attr('src', data.url)
      });
      city.text(`${data.name} (${getDate(data.dt)})`);
      currentWeather();
  });
}); 
          

// Get Recent Searches from localStorage
	function getRecentSearches() {
	  var searches = JSON.parse(localStorage.getItem("searches"));
	  if (searches != null) {
		for (var i = 0; i < searches.length; i++) {
// Create Element
		  var newCity = $("<li>");
		  newCity.addClass("list-group-item");
		  newCity.text(searches[i].input);
// Append to List
		  $("#recent-searches-list").prepend(newCity);
		}
		$("#recent-searches").show();
	  } else {
		$("#recent-searches").hide();
	  }
	}
    
    $("#clearBtn").on("click", function() {
        localStorage.clear();
        $("#recent-searches-list").empty();
    });

// Take users' country/city/state input, fetch latitude and longtitude from five day API

function currentData() {
    var city_name = inputEl.val();
    weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&units=imperial&appid=35d94501369d43748d1a83d5811f76e7';
    console.log(weatherURL);
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        longitude = data.coord.lon;
        latitude = data.coord.lat;
        var iconCode=data.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
    fetch(iconurl)
        .then(data => {
            icon.attr('src', data.url)
        });
        city.text(`${data.name} (${getDate(data.dt)})`);
        currentWeather();
    });
}; 
        
// Take latitude and longtitude, fetch temperature, wind, humidty, UV Index, sunrise, and sunset data from five day API and update current weather

function currentWeather(){
    urlWeather ="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude +"&lon=" + longitude + "&units=imperial&appid=35d94501369d43748d1a83d5811f76e7";
    console.log(urlWeather);
    fetch(urlWeather)
    .then(response => response.json())
    .then(data => {

        console.log(data);
        temp.text(`Current Temperature: ${data.current.temp}\xB0F`);
        wind.text(`Wind: ${data.current.wind_speed} MPH ${data.current.wind_deg}`);
        humidity.text(`Humidity: ${data.current.humidity}%`);
        uv.text(`UV Index: ${data.current.uvi}`);
        sunrise.text(`Sunrise: ${getTime(data.current.sunrise)}AM  `);
        sunset.text(`Sunset: ${getTime(data.current.sunset)}PM`);
 
// Loop 5 times to create a card for each of the next 5 days using API

        fiveDay.empty();

        console.log(data.daily)
        var dailyArray =data.daily
        for (var i =0; i<5;i++){
            var iconCode=dailyArray[i].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            fetch(iconurl)
            .then(data => {
                $('#fiveDayIcon').attr('src', data.url);

            });

            fiverCards(getDate(dailyArray[i].dt),iconurl, dailyArray[i].temp.max, dailyArray[i].temp.min,
                  dailyArray[i].wind_speed,dailyArray[i].wind_deg, dailyArray[i].humidity, getTime(dailyArray[i].sunrise),getTime(dailyArray[i].sunset));

        }
    });
};

// Manipulate DOM to create cards

function fiverCards (date,icon,tempH,tempL,windSpeed,windDir,humidity,sunrise,sunset){
    
    fiveDay.append(`<div class="card d-inline-flex mx-3" style="width: 13rem;border-radius: 20px;background-color:black;">
    <div class="card-body text-center" id='fiverCards'>
    <h5 class="card-title" id='card-title'>${date}</h5>
    <img id ='fiveDayIcon'src=${icon}>
    <h6 class="card-subtitle mb-2 text-muted" id ='temps'>High: ${tempH}\xB0F</h6>
    <h6 class="card-subtitle mb-2 text-muted" id ='temps'>Low: ${tempL}\xB0F</h6>
    <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Wind: ${windSpeed} MPH ${windDir}</h6>
    <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Humidity: ${humidity}%</h6>
    <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Sunrise: ${sunrise} AM</h6>
    <h6 class="card-subtitle mb-2 text-muted" id ='cardinfo'>Sunset: ${sunset}PM</h6>
    
    
    </div>
    </div>`);
};

function getTime(unix_time){
    var date = new Date(unix_time*1000);
    var hours = date.getHours();
    if(hours>12){
        hours-=12;``
    }
    var minutes = date.getMinutes()
    
    if(minutes<10){
        minutes ='0'+minutes;
        
    }
    return `${hours}:${minutes}`;
};

function getDate(unix_time){
    var date = new Date(unix_time*1000);
    var month =date.getMonth()+1;
    var day = date.getDate();
    var year = date.getFullYear();
    return`${month}/${day}/${year}`;
}

// Loop through preset cities, fetch data, and update current weather 

var names = ['Austin', 'Chicago', 'new york', 'Orlando', 'san francisco', 'Seattle', 'Denver', 'Atlanta']
var cities = [$('#Austin'), $('#Chicago'), $('#New'), $('#Orlando'), $('#San'), $('#Seattle'), $('#Denver'), $('#Atlanta')]
for (let i = 0; i < cities.length && names.length; i++) {
cities[i].on('click',()=>{
   weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ names[i] +'&units=imperial&appid=35d94501369d43748d1a83d5811f76e7';
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {

        longitude = data.coord.lon;
        latitude = data.coord.lat;

        var iconCode=data.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";

        fetch(iconurl)
        .then(data => {
            icon.attr('src', data.url)

        });
        city.text(`${data.name} (${getDate(data.dt)})`);
        currentWeather();
        });
})};
