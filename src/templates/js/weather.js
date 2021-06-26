/* Service variables */
let weather_json = {}, forecast_json = {},
    temp = [], tempday = [], tempnight = [], 
        humidity = [], pressure = [], currenttemp = [], 
        currentfeeltemp = [], currenthum = [], currentpres = [], 
        forecasttemp = [], nextforecasttemp = [], forecastfeeltemp = [], 
        nextforecastfeeltemp = [], suggestions = [], currentweather = [],
    globalplace = '', weatherplace = '', friendsplace = '', 
        statplace = '', weathertab = '', friendstab = '', 
        alarmstab = '', stattab = '', selectedchart = '', 
        selectedstreem = '',
    activetab = 'weather',
    chartloaded = false,
    globallat = null, globallon = null, 
        fetchweatherdata = null, fetchaddinfodata = null, fetchforecastdata = null, 
        fetchsecondforecastdata = null, fetchforecasttemp = null, fetchstat = null

/* Ui */
hidepopup = (geo = 'on') => {
    if (geo === 'on') { allowgeo() }
    document.querySelector('.popup_placeholder').style.display = 'none';
    document.querySelector('.container').style.display = '';
    document.querySelector('.content').style.display = '';
    document.querySelector('.detail').style.display = '';
}

/* Geolocation */
allowgeo = () => {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    success = (pos) => {
        let crd = pos.coords
            globallon = crd.latitude
            globallat = crd.longitude
            globalplace = 'Based on geolocation from GPS'
    }
    error = (e) => {
        console.warn(`ERROR(${e.code}): ${e.message}`)
        document.querySelector('.detail').style.margin = ''
        document.querySelector('.popup_placeholder').style.display = ''
        document.querySelector('.container').style.display = 'none'
        document.querySelector('.detail').style.display = 'none'
        document.querySelector('.content').style.display = 'none'
        inner = `
            <div class="popup">
                <h3>Somethink went wrong...</h3>
                <p>It seems that your device do not have GPS or you prohibit using GPS for this app.</p>
                <button onclick="hidepopup('off')">OK</button>
            </div>
        `
        document.querySelector('.popup_placeholder').innerHTML = inner
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
}
writegeoloc = (elem) => {
    fetchweatherdata = null
    fetchaddinfodata = null
    fetchforecastdata = null
    fetchsecondforecastdata = null
    fetchforecasttemp = null
    fetchstat = null
    globallat = elem.id.split(',')[0]
    globallon = elem.id.split(',')[1]
    globalplace = elem.innerText
    if (globallat & globallon) { weather(globallat, globallon, globalplace) }
}
bygeoloc = (type) => {
    event.preventDefault()
    allowgeo()
    if (type === 'weather') {
        fetchweatherdata = null
        fetchaddinfodata = null
        fetchforecastdata = null
        fetchsecondforecastdata = null
        fetchforecasttemp = null
        weather(globallat, globallon, globalplace)
    }
}

/* Address query to suggestions API */
query = (input, type) => {
    if (input.length > 2) {
        fetch(`http://${window.location.host}:8500/?query=` + input)
            .then(response => response.text())
            .then(result => suggestions = JSON.parse(result))
            .catch(error => console.log('error', error))
        var inner = `
            <div class='loader_placeholder'>
                <div class='lds-ellipsis loader'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        `
        if (suggestions.length > 0 && type === 'weather') {
            inner = ''
            suggestions.forEach(function(item) {
                if (item.data.geo_lat & item.data.geo_lon) {
                    inner += `<p 
                        id='${item.data.geo_lon},${item.data.geo_lat}'
                        onclick="writegeoloc(this)"
                    >${item.value}</p>`
                }
            })
        }
        document.querySelector('.suggestions').style.display = 'block'
        document.querySelector('.suggestions').innerHTML = inner
    }
    if (input.length < 4) {
        suggestions = []
        document.querySelector('.suggestions').innerHTML = ''
        document.querySelector('.suggestions').style.display = 'none'
    }
}

/* Weather */
weatherrequest = (lat, lon) => {
    if (lat & lon) {
        if (!fetchweatherdata) {
                    fetchweatherdata = weather_json;
                    currentweather = JSON.stringify(weather_json);
                    var inner = `
                        <div class="meteoinfo leftblock">
                            <h3 class="title">Today</h3>
                            <p onclick="weather(null, null)">${JSON.parse(currentweather).weather[0].description}</p>
                            <p onclick="addinfo('temp')">${'Real temperature ' + JSON.parse(currentweather).main.temp + ' °C'}</p>
                            <p onclick="addinfo('feeltemp')">${'Feels like ' + JSON.parse(currentweather).main.feels_like + ' °C'}</p>
                            <p onclick="addinfo('hum')">${'Humidity ' + JSON.parse(currentweather).main.humidity + ' %'}</p>
                            <p onclick="addinfo('pres')">${'Atmosphere pressure ' + JSON.parse(currentweather).main.pressure + ' mmHg'}</p>
                        </div>
                    `;
                    document.querySelector('.weatherinfo').innerHTML = inner;
                    document.querySelector('.weatherinfo').innerHTML += `
                        <div class="meteoinfo rightblock">
                        <iframe
                            id="map"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            scrolling="no"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=${Number(lat) - 0.015},${Number(lon) - 0.015},${Number(lat) + 0.015},${Number(lon) + 0.015}&amp;layer=mapquest&amp;marker=${lon},${lat}">
                        </iframe>
                    `;
                    weathertab = document.querySelector('.content').innerHTML;
        }
        else {
            currentweather = JSON.stringify(fetchweatherdata);
            var inner = `
                <div class="meteoinfo leftblock">
                    <h3 class="title">Сегодня</h3>
                    <p onclick="weather(null, null)">${JSON.parse(currentweather).weather[0].description}</p>
                    <p onclick="addinfo('temp')">${'Real temperature ' + JSON.parse(currentweather).main.temp + ' °C'}</p>
                    <p onclick="addinfo('feeltemp')">${'Feels like ' + JSON.parse(currentweather).main.feels_like + ' °C'}</p>
                    <p onclick="addinfo('hum')">${'Humidity ' + JSON.parse(currentweather).main.humidity + ' %'}</p>
                    <p onclick="addinfo('pres')">${'Atmosphere pressure ' + JSON.parse(currentweather).main.pressure + ' mmHg'}</p>
                </div>
            `;
            document.querySelector('.weatherinfo').innerHTML = inner;
            document.querySelector('.weatherinfo').innerHTML += `
                <div class="meteoinfo rightblock">
                <iframe
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="no"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${Number(lat) - 0.015},${Number(lon) - 0.015},${Number(lat) + 0.015},${Number(lon) + 0.015}&amp;layer=mapquest&amp;marker=${lon},${lat}">
                </iframe>
            `;
            weathertab = document.querySelector('.content').innerHTML;
        }
    }
}

/* Forecast */
forecast = (days) => {
    event.preventDefault()
    if (days == 2) {
        forecasttemp = [];
        forecastfeeltemp = [];
        nextforecasttemp = [];
        nextforecastfeeltemp = [];
        document.querySelector('.detail').innerHTML = '';
        if (globallat & globallon) {
            if (!fetchsecondforecastdata) {
                fetchsecondforecastdata = forecast_json;
                forecasttemp.push(forecast_json.daily[1].temp.day);
                forecasttemp.push(forecast_json.daily[1].temp.eve);
                forecasttemp.push(forecast_json.daily[1].temp.night);
                forecastfeeltemp.push(forecast_json.daily[1].feels_like.day);
                forecastfeeltemp.push(forecast_json.daily[1].feels_like.eve);
                forecastfeeltemp.push(forecast_json.daily[1].feels_like.night);
                nextforecasttemp.push(forecast_json.daily[2].temp.day);
                nextforecasttemp.push(forecast_json.daily[2].temp.eve);
                nextforecasttemp.push(forecast_json.daily[2].temp.night);
                nextforecastfeeltemp.push(forecast_json.daily[2].feels_like.day);
                nextforecastfeeltemp.push(forecast_json.daily[2].feels_like.eve);
                nextforecastfeeltemp.push(forecast_json.daily[2].feels_like.night);
            }
            else {  
                forecasttemp.push(fetchsecondforecastdata.daily[1].temp.day);
                forecasttemp.push(fetchsecondforecastdata.daily[1].temp.eve);
                forecasttemp.push(fetchsecondforecastdata.daily[1].temp.night);
                forecastfeeltemp.push(fetchsecondforecastdata.daily[1].feels_like.day);
                forecastfeeltemp.push(fetchsecondforecastdata.daily[1].feels_like.eve);
                forecastfeeltemp.push(fetchsecondforecastdata.daily[1].feels_like.night);
                nextforecasttemp.push(fetchsecondforecastdata.daily[2].temp.day);
                nextforecasttemp.push(fetchsecondforecastdata.daily[2].temp.eve);
                nextforecasttemp.push(fetchsecondforecastdata.daily[2].temp.night);
                nextforecastfeeltemp.push(fetchsecondforecastdata.daily[2].feels_like.day);
                nextforecastfeeltemp.push(fetchsecondforecastdata.daily[2].feels_like.eve);
                nextforecastfeeltemp.push(fetchsecondforecastdata.daily[2].feels_like.night);
            }
        }
    }
    else {
        document.querySelector('.detail').innerHTML = '';
    }
    if (globallat & globallon) {
        if (!fetchforecastdata) {
                    fetchforecastdata = forecast_json;
                    if (days == 2) {
                        inner = `
                            <div class="weatherinfo">
                                <div class="meteoinfo leftblock">
                                    <h3 class="title">Tomorrow</h3>
                                    <p onclick="addinfo(null, 'right', true)">${forecast_json.daily[1].weather[0].description}</p>
                                    <p onclick="addinfo('temp')">${'Temperature ' + forecast_json.daily[1].temp.day + ' °C'}</p>
                                    <p onclick="addinfo('feeltemp')">${'Feels like ' + forecast_json.daily[1].feels_like.day + ' °C'}</p>
                                    <p onclick="addinfo('hum')">${'Humidity ' + forecast_json.daily[1].humidity + ' %'}</p>
                                    <p onclick="addinfo('pres')">${'Atmospheric pressure ' + forecast_json.daily[1].pressure + ' mmHg'}</p>
                                </div>
                                <div class="meteoinfo rightblock">
                                    <h3 class="title">The day after tomorrow</h3>
                                    <p onclick="addinfo(null, 'left', true)">${forecast_json.daily[2].weather[0].description}</p>
                                    <p onclick="addinfo('temp', 'left')">${'Temperature ' + forecast_json.daily[2].temp.day + ' °C'}</p>
                                    <p onclick="addinfo('feeltemp', 'left')">${'Feels like ' + forecast_json.daily[2].feels_like.day + ' °C'}</p>
                                    <p onclick="addinfo('hum', 'left')">${'Humidity ' + forecast_json.daily[2].humidity + ' %'}</p>
                                    <p onclick="addinfo('pres', 'left')">${'Atmospheric pressure ' + forecast_json.daily[2].pressure + ' mmHg'}</p>
                                </div>
                            </div>
                            <form>
                                <button onclick="weather(null, null)">Forecast for today</button>
                                <button onclick="forecast(2)">2-day forecast</button>
                                <button onclick="forecast(6)">6-day forecast</button>
                            </form>
                        `;
                        document.querySelector('.content').innerHTML = inner;
                    }
                    if (days == 6) {
                        inner = `
                            <div class="weatherinfo">
                                <div class="meteoinfo">
                                    <h3 class="title">Tomorrow</h3>
                                    <p onclick="forecastinfo(1)">
                                    ${forecast_json.daily[1].weather[0].description + ' ' + forecast_json.daily[1].temp.day + ' °C'}
                                    </p>
                                </div>
                                <div class="meteoinfo">
                                    <h3 class="title">The day after tomorrow</h3>
                                    <p onclick="forecastinfo(2)">
                                    ${forecast_json.daily[2].weather[0].description + ' ' + forecast_json.daily[2].temp.day + ' °C'}
                                    </p>
                                </div>
                                <div class="meteoinfo">
                                    <h3 class="title">After 3 days</h3>
                                    <p onclick="forecastinfo(3)">
                                    ${forecast_json.daily[3].weather[0].description + ' ' + forecast_json.daily[3].temp.day + ' °C'}
                                    </p>
                                </div>
                                <div class="meteoinfo">
                                    <h3 class="title">After 4 days</h3>
                                    <p onclick="forecastinfo(4)">
                                    ${forecast_json.daily[4].weather[0].description + ' ' + forecast_json.daily[4].temp.day + ' °C'}
                                    </p>
                                </div>
                                <div class="meteoinfo">
                                    <h3 class="title">After 5 days</h3>
                                    <p onclick="forecastinfo(5)">
                                    ${forecast_json.daily[5].weather[0].description + ' ' + forecast_json.daily[5].temp.day + ' °C'}
                                    </p>
                                </div>
                                <div class="meteoinfo">
                                    <h3 class="title">After 6 days</h3>
                                    <p onclick="forecastinfo(6)">
                                    ${forecast_json.daily[6].weather[0].description + ' ' + forecast_json.daily[6].temp.day + ' °C'}
                                    </p>
                                </div>
                            </div>
                            <form>
                                <button onclick="weather(null, null)">Forecast for today</button>
                                <button onclick="forecast(2)">2-day forecast</button>
                                <button onclick="forecast(6)">6-day forecast</button>
                            </form>
                        `;
                        document.querySelector('.content').innerHTML = inner;
                    }
        }
        else {
            if (days == 2) {
                inner = `
                    <div class="weatherinfo">
                        <div class="meteoinfo leftblock">
                            <h3 class="title">Tomorrow</h3>
                            <p onclick="addinfo(null, 'right', true)">${fetchforecastdata.daily[1].weather[0].description}</p>
                            <p onclick="addinfo('temp')">${'Temperature ' + fetchforecastdata.daily[1].temp.day + ' °C'}</p>
                            <p onclick="addinfo('feeltemp')">${'Feels like ' + fetchforecastdata.daily[1].feels_like.day + ' °C'}</p>
                            <p onclick="addinfo('hum')">${'Humidity ' + fetchforecastdata.daily[1].humidity + ' %'}</p>
                            <p onclick="addinfo('pres')">${'Atmospheric pressure ' + fetchforecastdata.daily[1].pressure + ' mmHg'}</p>
                        </div>
                        <div class="meteoinfo rightblock">
                            <h3 class="title">The day after tomorrow</h3>
                            <p onclick="addinfo(null, 'left', true)">${fetchforecastdata.daily[2].weather[0].description}</p>
                            <p onclick="addinfo('temp', 'left')">${'Temperature ' + fetchforecastdata.daily[2].temp.day + ' °C'}</p>
                            <p onclick="addinfo('feeltemp', 'left')">${'Feels like ' + fetchforecastdata.daily[2].feels_like.day + ' °C'}</p>
                            <p onclick="addinfo('hum', 'left')">${'Humidity ' + fetchforecastdata.daily[2].humidity + ' %'}</p>
                            <p onclick="addinfo('pres', 'left')">${'Atmospheric pressure ' + fetchforecastdata.daily[2].pressure + ' mmHg'}</p>
                        </div>
                    </div>
                    <form>
                        <button onclick="weather(null, null)">Forecast for today</button>
                        <button onclick="forecast(2)">2-day forecast</button>
                        <button onclick="forecast(6)">6-day forecast</button>
                    </form>
                `;
                document.querySelector('.content').innerHTML = inner;
            }
            if (days == 6) {
                inner = `
                    <div class="weatherinfo">
                        <div class="meteoinfo">
                            <h3 class="title">Tomorrow</h3>
                            <p onclick="forecastinfo(1)">
                            ${fetchforecastdata.daily[1].weather[0].description + ' ' + fetchforecastdata.daily[1].temp.day + ' °C'}
                            </p>
                        </div>
                        <div class="meteoinfo">
                            <h3 class="title">The day after tomorrow</h3>
                            <p onclick="forecastinfo(2)">
                            ${fetchforecastdata.daily[2].weather[0].description + ' ' + fetchforecastdata.daily[2].temp.day + ' °C'}
                            </p>
                        </div>
                        <div class="meteoinfo">
                            <h3 class="title">After 3 days</h3>
                            <p onclick="forecastinfo(3)">
                            ${fetchforecastdata.daily[3].weather[0].description + ' ' + fetchforecastdata.daily[3].temp.day + ' °C'}
                            </p>
                        </div>
                        <div class="meteoinfo">
                            <h3 class="title">After 4 days</h3>
                            <p onclick="forecastinfo(4)">
                            ${fetchforecastdata.daily[4].weather[0].description + ' ' + fetchforecastdata.daily[4].temp.day + ' °C'}
                            </p>
                        </div>
                        <div class="meteoinfo">
                            <h3 class="title">After 5 days</h3>
                            <p onclick="forecastinfo(5)">
                            ${fetchforecastdata.daily[5].weather[0].description + ' ' + fetchforecastdata.daily[5].temp.day + ' °C'}
                            </p>
                        </div>
                        <div class="meteoinfo">
                            <h3 class="title">After 6 days</h3>
                            <p onclick="forecastinfo(6)">
                            ${fetchforecastdata.daily[6].weather[0].description + ' ' + fetchforecastdata.daily[6].temp.day + ' °C'}
                            </p>
                        </div>
                    </div>
                    <form>
                        <button onclick="weather(null, null)">Forecast for today</button>
                        <button onclick="forecast(2)">2-day forecast</button>
                        <button onclick="forecast(6)">6-day forecast</button>
                    </form>
                `;
                document.querySelector('.content').innerHTML = inner;
            }
        }
    }
}

/* Forecast map & charts */
addinfo = (type = null, position = 'right', map = false, day = 0) => {
    if (map) {
        if (globallat & globallon) {
            var divposition = ''
            if (position === 'right') {
                divposition = 'left';
            }
            else if(position === 'left') {
                divposition = 'right';
            }
            document.querySelector('.' + position + 'block').innerHTML = `
                <iframe
                    id="map"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="no"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${Number(globallat) - 0.015},${Number(globallon) - 0.015},${Number(globallat) + 0.015},${Number(globallon) + 0.015}&amp;layer=mapquest&amp;marker=${globallon},${globallat}">
                </iframe>
            `;
        }
    }
    else {
        if (globallat & globallon) {
            if (!fetchaddinfodata) {
                fetchaddinfodata = forecast_json
                let array = forecast_json.hourly
                    currenttemp = []
                    currentfeeltemp = []
                    currenthum = []
                    currentpres = []
                for (let index = 0; index < array.length; index = index + 4) {
                    currenttemp.push(array[index].temp)
                    currentfeeltemp.push(array[index].feels_like)
                    currenthum.push(array[index].humidity)
                    currentpres.push(array[index].pressure)
                }
            }
            else {
                let array = fetchaddinfodata.hourly
                    currenttemp = []
                    currentfeeltemp = []
                    currenthum = []
                    currentpres = []
                for (let index = 0; index < array.length; index = index + 4) {
                    currenttemp.push(array[index].temp)
                    currentfeeltemp.push(array[index].feels_like)
                    currenthum.push(array[index].humidity)
                    currentpres.push(array[index].pressure)
                }
            }
        }
        if (type === 'temp') {
            document.querySelector('.' + position + 'block').innerHTML = `
                <h3 class="title">Temperature chart</h3>
                <canvas id="myChart"></canvas>
            `
            let ctx = document.getElementById('myChart').getContext('2d')
            let chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [0,2,4,6,8,10,12,14,16,18,20,22],
                    datasets: [{
                        label: 'Temperature during the day (°C)',
                        borderColor: '#CC1B41',
                        data: currenttemp
                    }]
                    },
                    options: {
                        layout: {
                            padding: {
                            left: 5,
                            right: 15,
                            top: 0,
                            bottom: 5
                        }
                    }
                }
            })
        }
        if (type === 'feeltemp') {
            document.querySelector('.' + position + 'block').innerHTML = `
                <h3 class="title">Temperature chart (feels like)</h3>
                <canvas id="myChart"></canvas>
            `;
            let ctx = document.getElementById('myChart').getContext('2d')
            let chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [0,2,4,6,8,10,12,14,16,18,20,22],
                    datasets: [{
                        label: 'Feels like (°C)',
                        borderColor: '#13926B',
                        data: currentfeeltemp
                    }]
                    },
                    options: {
                        layout: {
                            padding: {
                            left: 5,
                            right: 15,
                            top: 0,
                            bottom: 5
                        }
                    }
                }
            })
        }
        if (type === 'hum') {
            document.querySelector('.' + position + 'block').innerHTML = `
                <h3 class="title">Humidity Chart</h3>
                <canvas id="myChart"></canvas>
            `;
            let ctx = document.getElementById('myChart').getContext('2d')
            let chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [0,2,4,6,8,10,12,14,16,18,20,22],
                    datasets: [{
                        label: 'Humidity during the day (%)',
                        borderColor: '#CC1B41',
                        data: currenthum
                    }]
                    },
                    options: {
                        layout: {
                            padding: {
                            left: 5,
                            right: 15,
                            top: 0,
                            bottom: 5
                        }
                    }
                }
            })
        }
        if (type === 'pres') {
            document.querySelector('.' + position + 'block').innerHTML = `
                <h3 class="title">Atmospheric pressure graph</h3>
                <canvas id="myChart"></canvas>
            `
            let ctx = document.getElementById('myChart').getContext('2d')
            let chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [0,2,4,6,8,10,12,14,16,18,20,22],
                    datasets: [{
                        label: 'Atmospheric pressure (mmHg)',
                        borderColor: '#13926B',
                        data: currentpres
                    }]
                    },
                    options: {
                        layout: {
                            padding: {
                            left: 5,
                            right: 15,
                            top: 0,
                            bottom: 5
                        }
                    }
                }
            })
        }
    }
}

/* Forecast temp charts */
forecastinfo = (day = 0) => {
    document.querySelector('.detail').innerHTML = ''
    if (globallat & globallon) {
        if (!fetchforecasttemp) {
            fetchforecasttemp = forecast_json
            forecasttemp = []
            forecastfeeltemp = []
            forecasttemp.push(forecast_json.daily[day].temp.day)
            forecasttemp.push(forecast_json.daily[day].temp.eve)
            forecasttemp.push(forecast_json.daily[day].temp.night)
            forecastfeeltemp.push(forecast_json.daily[day].feels_like.day)
            forecastfeeltemp.push(forecast_json.daily[day].feels_like.eve)
            forecastfeeltemp.push(forecast_json.daily[day].feels_like.night)
        }
        else {
            forecasttemp = []
            forecastfeeltemp = []
            forecasttemp.push(fetchforecasttemp.daily[day].temp.day)
            forecasttemp.push(fetchforecasttemp.daily[day].temp.eve)
            forecasttemp.push(fetchforecasttemp.daily[day].temp.night)
            forecastfeeltemp.push(fetchforecasttemp.daily[day].feels_like.day)
            forecastfeeltemp.push(fetchforecasttemp.daily[day].feels_like.eve)
            forecastfeeltemp.push(fetchforecasttemp.daily[day].feels_like.night)
        }
    }
    let key = [
            ' for today', ' for tomorrow', ' the day after tomorrow', 
            ' after 3 days', ' after 4 days', ' after 5 days', ' after 6 days'
            ]
    if (forecasttemp.length > 0) {
        document.querySelector('.detail').innerHTML = `
            <h3 class="title">Weather forecast${key[day]}</h3>
            <canvas style="margin-bottom: 8px;" id="myChart"></canvas>
        `;
        let ctx = document.getElementById('myChart').getContext('2d')
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Day', 'Evening', 'Night'],
                datasets: [{
                    label: 'Temperature (°C)',
                    borderColor: '#13926B',
                    backgroundColor: '#13926B',
                    data: forecasttemp
                },{
                    label: 'Feels like (°C)',
                    borderColor: '#CC1B41',
                    backgroundColor: '#CC1B41',
                    data: forecastfeeltemp
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 5,
                        right: 15,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        })
        intoview = () => {
            document.querySelector('.detail').scrollIntoView({
                block: "center", inline: "center", behavior: "smooth"
            })
        }
        setTimeout(intoview, 250)
    }
}

/* Main function weather&forecasr API request */
weather = (lat, lon, place = null) => {
    event.preventDefault()
    document.querySelector('.detail').innerHTML = ''
    document.querySelector('.container').innerHTML = `
        <br>
        <form>
            <input class="input" type="text" placeholder="Enter the name of the locality" maxlength="30" oninput="query(this.value, 'weather')">
            <button onclick="bygeoloc('weather')">Weather by GPS</button>
            <div class="suggestions"></div>
            <div class="geoloc"></div>
        </form>
    `
    if (place) {
        document.querySelector('.input').value = place;
        weatherplace = place;
    }
    if (lat && lon) {
        document.querySelectorAll('button').forEach((b)=>{b.disabled=true})
        fetch(`http://${window.location.host}:8100` + '?lat=' + lat + '&lon=' + lon)
            .then( (value) => {
                if(value.status !== 200){
                    return Promise.reject(new Error('Error ' + value.status))
                }
                return value.json()
            })
            .then( (value) => {
                weather_json = value
                fetch(`http://${window.location.host}:8200` + '?lat=' + lat + '&lon=' + lon)
                    .then( (value) => {
                        if(value.status !== 200){
                            return Promise.reject(new Error('Error ' + value.status))
                        }
                        return value.json()
                    })
                    .then( (value) => {
                        document.querySelectorAll('button').forEach((b)=>{b.disabled=false})
                        forecast_json = value
                        document.querySelector('.content').innerHTML = `
                            <div class="weatherinfo"></div>
                            <form>
                                <button onclick="weather(null, null)">Forecast for today</button>
                                <button onclick="forecast(2)">2-day forecast</button>
                                <button onclick="forecast(6)">6-day forecast</button>
                            </form>
                        `
                        weatherrequest (lat, lon, 'json')
                        addinfo()
                    })
            })
    }
    if (lat == null || lon == null) {
        document.querySelector('.content').innerHTML = ''
        if (weathertab.length > 1) {
            document.querySelector('.content').innerHTML = weathertab
            document.querySelector('.input').value = weatherplace
        }
    }
    document.querySelector('.suggestions').style.display = 'none'
}

/* Init */
window.onload = function() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.detail').style.display = 'none';
    weather(null, null);
}