var currentDay = $('#cur-day');
var m = moment()
var uvIndexElm =$('#uvi')
//CONNECTED TO REFRESH BTN
var refresh = $('#refresh')
//a button to update the time
refresh.on('click', function () {
    location.reload();
    forcast()
  });

var weather = 
{
APIKey: 'b7c41b3ca52d37ef2ccc92658a1d9029',
fetchWeatherData: function (city) {
fetch( "https://api.openweathermap.org/data/2.5/weather?q="
+city 
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
var { lon } = data.coord;
var { lat } = data.coord;

//displays the data from the api as an HTML element
document.getElementById('city-name').innerText = name + ",";
document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
document.getElementById('discription').innerText = description;
document.getElementById('Temp').innerText = 'Current temp is ' + temp + 'F°';
document.getElementById('wind').innerText = 'Wind speed ' + speed + ' mph';
document.getElementById('humidity').innerText = 'Humidity: ' + humidity + '%';
//get the uvi
fetch ('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat +'&lon=' +lon+ '&exclude=hourly,daily&appid=8736f1430041abf936f25448dbd98026')
.then(response => response.json())
.then(data => this.showUVI(data))},
showUVI: function (data){
    var { uvi } = data.current
    console.log(uvi)
    uvIndexElm.text('UV index: '+ uvi)
//Uvi color coding
if (uvi > 11 ) {
    uvIndexElm.css("background-color","purple")
    uvIndexElm.css("border-radius", "4px")
    uvIndexElm.css("color", "white")
} else
if (uvi > 8 ) {
    uvIndexElm.css("background-color","red")
    uvIndexElm.css("border-radius", "4px")
    uvIndexElm.css("color", "white")
} else
if (uvi > 5 ) {
    uvIndexElm.css("background-color","orange")
    uvIndexElm.css("color", "black")
    uvIndexElm.css("border-radius", "4px")
} else if (uvi > 3){
    uvIndexElm.css("background-color","yellow")
    uvIndexElm.css("border-radius", "4px")
    uvIndexElm.css("color", "white")

} else{
    uvIndexElm.css("background-color","green")
    uvIndexElm.css("border-radius", "4px")
    uvIndexElm.css("color", "white")

}
},

//valadates the content of the search box input
SearchResults: function() {
    
    this.fetchWeatherData(document.querySelector(".search-box").value);
    //get data from search to add to search history
    var input = document.querySelector(".search-box").value
    arrayValue.push(input)
    //arrayValue var is declared on line 120
    localStorage.setItem('fruit', JSON.stringify(arrayValue))
    
    
},
};
//five day forcast
var fiveDay = {
    fetchForcastData: function (city){
    
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=b7c41b3ca52d37ef2ccc92658a1d9029')
        
        .then(response => response.json())
        .then(data => this.showForcast(data))},
    
        showForcast: function (data){
            console.log
            //Getting the values for windspeed, humidity, temp, and icon.
            //wind
            for(i = 0; i<5; i++){
               document.getElementById("wind" + (i+1) + "Max").innerHTML = "Wind Speed: " + Number(data.list[1 + i*4].wind.speed) + 'MPH';
                
           }
           //humidity
            for(i = 0; i<5; i++){
                document.getElementById("humidity" + (i+1) + "Level").innerHTML = "Humidity: " + Number(data.list[i*4].main.humidity)+'%';
               
            }
           //temp
            for(i = 0; i<5; i++){
                document.getElementById("temp" + (i+1) + "Max").innerHTML = "Temp: " + Number(data.list[i*4].main.temp) + "°";
            }
        
            //Getting Weather Icons
             for(i = 0; i<5; i++){
                document.getElementById("icon" + (i+1) + 'Img').setAttribute('width', '50px');
                document.getElementById("icon" + (i+1) + 'Img').setAttribute('height', '50px');
                document.getElementById("icon" + (i+1) + 'Img').src = "https://openweathermap.org/img/wn/" + data.list[i*4].weather[0].icon + ".png";
            }
            for(i = 0; i<5; i++){
                document.getElementById("date" + (i+1) ).innerHTML =  moment(data.list[i*4].dt*2000).format('dddd');
            }
    },
    SearchResults5d: function() {
        
        this.fetchForcastData(document.querySelector(".search-box").value);
    },
        
    }
    
// button to run the functions above
document.querySelector(".search button").addEventListener('click', function() {
    weather.SearchResults() 
   fiveDay.SearchResults5d()
   currentDay.text(m.format('LL'))
})


   
    

//This is the array for search history.       
var arrayValue = JSON.parse(localStorage.getItem('fruit'))||[]
//this var is for appending children to the dic with the id of 'search-history'
var searchHistory = document.getElementById('search-history')
     
//HISTORY SLOT FOR ARRAY VALUE 0
function historyAutoFill0(){weather.fetchWeatherData(arrayValue[0])
    fiveDay.fetchForcastData(arrayValue[0]); currentDay.text(m.format('LL'))}
var ind0 = document.createElement ('p')
ind0.setAttribute('onclick', 'historyAutoFill0()')
ind0.textContent = arrayValue[0]
searchHistory.appendChild(ind0)

//HISTORY SLOT FOR ARRAY VALUE 1
function historyAutoFill1(){weather.fetchWeatherData(arrayValue[1])
    fiveDay.fetchForcastData(arrayValue[1]); currentDay.text(m.format('LL'))}
var ind1 = document.createElement ('p')
ind1.setAttribute('onclick', 'historyAutoFill1()')
ind1.textContent = arrayValue[1]
searchHistory.appendChild(ind1)

//HISTORY SLOT FOR ARRAY VALUE 2
function historyAutoFill2(){weather.fetchWeatherData(arrayValue[2])
    fiveDay.fetchForcastData(arrayValue[2]); currentDay.text(m.format('LL'))}
var ind2 = document.createElement ('p')
ind2.setAttribute('onclick', 'historyAutoFill2()')
ind2.textContent = arrayValue[2]
searchHistory.appendChild(ind2)

//HISTORY SLOT FOR ARRAY VALUE 3
function historyAutoFill3(){weather.fetchWeatherData(arrayValue[3])
    fiveDay.fetchForcastData(arrayValue[3]); currentDay.text(m.format('LL'))}
var ind3 = document.createElement ('p')
ind3.setAttribute('onclick', 'historyAutoFill3()')
ind3.textContent = arrayValue[3]
searchHistory.appendChild(ind3)

//HISTORY SLOT FOR ARRAY VALUE 4
function historyAutoFill4(){weather.fetchWeatherData(arrayValue[4])
    fiveDay.fetchForcastData(arrayValue[4]); currentDay.text(m.format('LL'))}
var ind4 = document.createElement ('p')
ind4.setAttribute('onclick', 'historyAutoFill4()')
ind4.textContent = arrayValue[4]
searchHistory.appendChild(ind4)

//HISTORY SLOT FOR ARRAY VALUE 5
function historyAutoFill5(){weather.fetchWeatherData(arrayValue[5])
    fiveDay.fetchForcastData(arrayValue[5]); currentDay.text(m.format('LL'))}
var ind5 = document.createElement ('p')
ind5.setAttribute('onclick', 'historyAutoFill5()')
ind5.textContent = arrayValue[5]
searchHistory.appendChild(ind5)

//HISTORY SLOT FOR ARRAY VALUE 6
function historyAutoFill6(){weather.fetchWeatherData(arrayValue[6])
    fiveDay.fetchForcastData(arrayValue[6]); currentDay.text(m.format('LL'))}
var ind6 = document.createElement ('p')
ind6.setAttribute('onclick', 'historyAutoFill6()')
ind6.textContent = arrayValue[6]
searchHistory.appendChild(ind6)

//HISTORY SLOT FOR ARRAY VALUE 7
function historyAutoFill7(){weather.fetchWeatherData(arrayValue[7])
    fiveDay.fetchForcastData(arrayValue[7]); currentDay.text(m.format('LL'))}
var ind7 = document.createElement ('p')
ind7.setAttribute('onclick', 'historyAutoFill7()')
ind7.textContent = arrayValue[7]
searchHistory.appendChild(ind7)

//HISTORY SLOT FOR ARRAY VALUE 8
function historyAutoFill8(){weather.fetchWeatherData(arrayValue[8])
    fiveDay.fetchForcastData(arrayValue[8]); currentDay.text(m.format('LL'))}
var ind8 = document.createElement ('p')
ind8.setAttribute('onclick', 'historyAutoFill8()')
ind8.textContent = arrayValue[8]
searchHistory.appendChild(ind8)

//HISTORY SLOT FOR ARRAY VALUE 9
function historyAutoFill9(){weather.fetchWeatherData(arrayValue[9])
    fiveDay.fetchForcastData(arrayValue[9]); currentDay.text(m.format('LL'))}
var ind9 = document.createElement ('p')
ind9.setAttribute('onclick', 'historyAutoFill9()')
ind9.textContent = arrayValue[9]
searchHistory.appendChild(ind9)

//HISTORY SLOT FOR ARRAY VALUE 10
function historyAutoFill10(){weather.fetchWeatherData(arrayValue[10])
    fiveDay.fetchForcastData(arrayValue[10]); currentDay.text(m.format('LL'))}
var ind10 = document.createElement ('p')
ind10.setAttribute('onclick', 'historyAutoFill10()')
ind10.textContent = arrayValue[10]
searchHistory.appendChild(ind10)

