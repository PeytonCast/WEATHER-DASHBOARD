
var weather = 
{
APIKey: 'b7c41b3ca52d37ef2ccc92658a1d9029',
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
//var { uvi } = data.uvi
//displays the data from the api as an HTML element
document.getElementById('city-name').innerText = name;
document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
document.getElementById('discription').innerText = description;
document.getElementById('Temp').innerText = 'Current temp is ' + temp + 'F°';
document.getElementById('wind').innerText = 'Wind speed ' + speed + ' mph';
//document.getElementById('feels').innerText = ' ' + uvi + '';
document.getElementById('humidity').innerText = 'Humidity: ' + humidity + '%';

},
//valadates the content of the search box input

SearchResults: function() {
    this.fetchWeatherData(document.querySelector(".search-box").value);
    //get dat from search to add to search history
    var new_data = document.querySelector(".search-box").value
    //creates an empty array if there is no data
    if (localStorage.getItem('data')== null) {
        localStorage.setItem('data', '[]')
    }
    //adds old data to new data making a bigger array which is a search history
    var old_data = JSON.parse(localStorage.getItem('data'))
    old_data.push(new_data)
    //save change
    localStorage.setItem('data', JSON.stringify(old_data));

    runHistory()
    
},
};
// button to run the functions above
document.querySelector(".search button").addEventListener('click', function() {
    weather.SearchResults()
})


    var empty = []

    //i need to create a search history fully iteracable
    //IF i input content in my search box (event)
    var inputBox = document.getElementById('search')
    var searchHistory = document.getElementById('search-history')
    var getlocal = localStorage.getItem('history')
    let last = empty[empty.length - 1]
  
  function runHistory() {
    if (inputBox = String){
       
        var button = document.createElement ('p')
        button.setAttribute('id', localStorage.getItem('setItem'))
        button.setAttribute('onclick', 'historyAutoFill()')
        button.textContent = localStorage.getItem('history' )
        searchHistory.appendChild(button)
        localStorage.setItem('storedBtn', button)
        
    }
}
 

function historyAutoFill()
{
    
    weather.fetchWeatherData()
}

