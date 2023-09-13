# Weather Dashoard

![](./assets/css/front.gif)

## The Process
- Create weather dashboard that updates data based on users' input and selection
- Create HTML file that imports JS Moment library, Bootstrap, CSS file, and JavaScript file
- Provide space theme with our CSS file
- Create JavaScript fetching data from 5 Day Forecast API depending on users' input  
- Modify HTML file to dynamically work with JavaScript file and CSS file

HTML File

```
Import the following library/files:
CSS file, Boostrap Library, Font Awesome Library, Javascript File, Moment, and jQuery Library
```

CSS File

```
Provide a space theme
Add spinnning astronaut
Customize preset buttons
Animate five day cards
```
Specific functions in JavaScript file


Add event listener when user click or search for a city 

```javascript
inputEl.keypress(function(event) {
    if (event.keyCode === 13) {
        currentData();
    }
});
search.on('click' ,currentData);
```

Take users' country/city/state input, fetch latitude and longtitude from five day API

```javascript
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
```

Take latitude and longtitude, fetch temperature, wind, humidty, UV Index, sunrise, and sunset data from five day API and update current weather

```javascript
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
```

Loop 5 times to create a card for each of the next 5 days using API

```javascript
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
```

Manipulate DOM to create cards

```javascript
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
```

Loop through preset cities, fetch data, and update current weather 


```javascript
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
```


## The Result
After importing bootstrap, jQuery, and Moment to our HTML file along with dynamically coding Javascript while utilizing Five Day's Weather API and stylizing with CSS, we were able to provide a clean, interactive, function, and informative weather dashboard for our client. 

This project was uploaded to GitHub at the following repository link:
[https://github.com/nhanng19/weather_dashboard](https://github.com/nhanng19/weather_dashboard)

Deployed Web Application Link:
[https://nhanng19.github.io/weather_dashboard/](https://nhanng19.github.io/weather_dashboard/)
