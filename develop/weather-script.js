
var search = $('#search')
var form = $('#form')
//var recentSearched =$('#recent-search1')
var weather = 
{
APIKey: '32400c2b40785d6c9c099ed3c9d49d48',
fetchWeatherData: function (city) {
fetch( "https://api.openweathermap.org/data/2.5/weather?q="
+ city 
+"&units=imperial&appid=" 
+ this.APIKey
)
.then((response) => response.json())
.then((data) => this.showWeather(data))
},

showWeather: function(data) {
var { name } = data;
var { icon, description } = data.weather[0];
var { temp, humidity } = data.main;
var { speed } = data.wind;
var { feels_like } = data.main
console.log( 'name',name, 'icon',icon, 'description',description, 'temp',temp, 'humid',humidity, 'wind speed',speed)
document.getElementById('city-name').innerText = name;
document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
document.getElementById('discription').innerText = description;
document.getElementById('Temp').innerText = 'Current temp is ' + temp + 'F°';
document.getElementById('wind').innerText = 'Wind speed ' + speed + ' mph';
document.getElementById('feels').innerText = 'Feels like ' + feels_like + 'F°';
document.getElementById('humidity').innerText = 'Humidity: ' + humidity + '%';

},
SearchResults: function() {
    this.fetchWeatherData(document.querySelector(".search-box").value);
},
};
document.querySelector(".search button").addEventListener('click', function() {
    weather.SearchResults()
})

   

//city.on('input', searchWeather=>{cityName.text(searchWeather.target.value) })
//var getData = () => {localStorage.setItem('cityWeather', cityName.text())}
//search.on('click', getData)


//cityName.text(localStorage.getItem('cityWeather'))
//recentSearched.appendChild(localStorage.getItem('cityWeather'))
