var currentDay = $('#cur-day');
var m = moment()
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
//var { uvi } = data.uvi  (uvi is no longer suported in 2.5)

//displays the data from the api as an HTML element
document.getElementById('city-name').innerText = name + ",";
document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
document.getElementById('discription').innerText = description;
document.getElementById('Temp').innerText = 'Current temp is ' + temp + 'F°';
document.getElementById('wind').innerText = 'Wind speed ' + speed + ' mph';
//document.getElementById('uvi').innerText = 'UV index' + uvi; //(uvi is no longer suported in 2.5)
document.getElementById('humidity').innerText = 'Humidity: ' + humidity + '%';

//What i would have done if uvi was working-
//if (uvi.value < 11 ) {
//    document.getElementById('uvi').setAttribute('class', 'p-1 bg-danger text-white rounded' )
//} else
//if (uvi.value < 6 ) {
//    document.getElementById('uvi').setAttribute('class', 'p-1 bg-warning text-white rounded' )
//} else
//if (uvi.value < 3 ) {
//    document.getElementById('uvi').setAttribute('class', 'p-1 bg-success text-white rounded' )
//}
},
//valadates the content of the search box input
SearchResults: function() {
    
    this.fetchWeatherData(document.querySelector(".search-box").value);
    //get data from search to add to search history
    var input = document.querySelector(".search-box").value
    arrayValue.push(input)
    //arrayValue var is declared on line 121
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
               document.getElementById("wind" + (i+1) + "Max").innerHTML = "Wind Speed: " + Number(data.list[i*8].wind.speed) + 'MPH';
                
           }
           //humidity
            for(i = 0; i<5; i++){
                document.getElementById("humidity" + (i+1) + "Level").innerHTML = "Humidity: " + Number(data.list[i*8].main.humidity)+'%';
               
            }
           //temp
            for(i = 0; i<5; i++){
                document.getElementById("temp" + (i+1) + "Max").innerHTML = "Temp: " + Number(data.list[i*8].main.temp) + "°";
            }
        
            //Getting Weather Icons
             for(i = 0; i<5; i++){
                document.getElementById("icon" + (i+1) + 'Img').setAttribute('width', '50px');
                document.getElementById("icon" + (i+1) + 'Img').setAttribute('height', '50px');
                document.getElementById("icon" + (i+1) + 'Img').src = "https://openweathermap.org/img/wn/" + data.list[i*8].weather[0].icon + ".png";
            }
            for(i = 0; i<5; i++){
                document.getElementById("date" + (i+1) ).innerHTML =  moment(data.list[i*8].dt*1000).format('dddd');
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
    fiveDay.fetchForcastData(arrayValue[0])}
var ind0 = document.createElement ('p')
ind0.setAttribute('onclick', 'historyAutoFill0()')
ind0.textContent = arrayValue[0]
searchHistory.appendChild(ind0)

//HISTORY SLOT FOR ARRAY VALUE 1
function historyAutoFill1(){weather.fetchWeatherData(arrayValue[1])
    fiveDay.fetchForcastData(arrayValue[1])}
var ind1 = document.createElement ('p')
ind1.setAttribute('onclick', 'historyAutoFill1()')
ind1.textContent = arrayValue[1]
searchHistory.appendChild(ind1)

//HISTORY SLOT FOR ARRAY VALUE 2
function historyAutoFill2(){weather.fetchWeatherData(arrayValue[2])
    fiveDay.fetchForcastData(arrayValue[2])}
var ind2 = document.createElement ('p')
ind2.setAttribute('onclick', 'historyAutoFill2()')
ind2.textContent = arrayValue[2]
searchHistory.appendChild(ind2)

//HISTORY SLOT FOR ARRAY VALUE 3
function historyAutoFill3(){weather.fetchWeatherData(arrayValue[3])
    fiveDay.fetchForcastData(arrayValue[3])}
var ind3 = document.createElement ('p')
ind3.setAttribute('onclick', 'historyAutoFill3()')
ind3.textContent = arrayValue[3]
searchHistory.appendChild(ind3)

//HISTORY SLOT FOR ARRAY VALUE 4
function historyAutoFill4(){weather.fetchWeatherData(arrayValue[4])
    fiveDay.fetchForcastData(arrayValue[4])}
var ind4 = document.createElement ('p')
ind4.setAttribute('onclick', 'historyAutoFill4()')
ind4.textContent = arrayValue[4]
searchHistory.appendChild(ind4)

//HISTORY SLOT FOR ARRAY VALUE 5
function historyAutoFill5(){weather.fetchWeatherData(arrayValue[5])
    fiveDay.fetchForcastData(arrayValue[5])}
var ind5 = document.createElement ('p')
ind5.setAttribute('onclick', 'historyAutoFill5()')
ind5.textContent = arrayValue[5]
searchHistory.appendChild(ind5)

//HISTORY SLOT FOR ARRAY VALUE 6
function historyAutoFill6(){weather.fetchWeatherData(arrayValue[6])
    fiveDay.fetchForcastData(arrayValue[6])}
var ind6 = document.createElement ('p')
ind6.setAttribute('onclick', 'historyAutoFill6()')
ind6.textContent = arrayValue[6]
searchHistory.appendChild(ind6)

//HISTORY SLOT FOR ARRAY VALUE 7
function historyAutoFill7(){weather.fetchWeatherData(arrayValue[7])
    fiveDay.fetchForcastData(arrayValue[7])}
var ind7 = document.createElement ('p')
ind7.setAttribute('onclick', 'historyAutoFill7()')
ind7.textContent = arrayValue[7]
searchHistory.appendChild(ind7)

//HISTORY SLOT FOR ARRAY VALUE 8
function historyAutoFill8(){weather.fetchWeatherData(arrayValue[8])
    fiveDay.fetchForcastData(arrayValue[8])}
var ind8 = document.createElement ('p')
ind8.setAttribute('onclick', 'historyAutoFill8()')
ind8.textContent = arrayValue[8]
searchHistory.appendChild(ind8)

//HISTORY SLOT FOR ARRAY VALUE 9
function historyAutoFill9(){weather.fetchWeatherData(arrayValue[9])
    fiveDay.fetchForcastData(arrayValue[9])}
var ind9 = document.createElement ('p')
ind9.setAttribute('onclick', 'historyAutoFill9()')
ind9.textContent = arrayValue[9]
searchHistory.appendChild(ind9)

//HISTORY SLOT FOR ARRAY VALUE 10
function historyAutoFill10(){weather.fetchWeatherData(arrayValue[10])
    fiveDay.fetchForcastData(arrayValue[10])}
var ind10 = document.createElement ('p')
ind10.setAttribute('onclick', 'historyAutoFill10()')
ind10.textContent = arrayValue[10]
searchHistory.appendChild(ind10)

