var http = require("http")
var exec = require('child_process').exec
var url = require("url")

function telegramApi(request, response) {
    var params = url.parse(request.url,true).query
    if (params.name && params.email && params.msg) {
        var clearName = params.name.replace('"',"'")
        var clearMsg = params.msg.replace('"',"'")
        var clearEmail = params.email.replace('"',"'")
        exec('python3 /backend/telegram_api.py "' + clearName + '" "' + clearEmail + '" "' + clearMsg + '"')
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
        response.writeHead(200, {'Content-Type': 'text/plain'})
        response.end('Serverside request to Telegram API processed successfully')
        console.log('New message from web form - name: ' + clearName + ' | email: ' + clearEmail)
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        console.log('Wrong request to Telegram API')
    }
}
function owmApiWeather(request, response) {
    var params = url.parse(request.url,true).query
    if (params.lat && params.lon) {
        var filteredLat = params.lat.replace('"',"'")
        var filteredLon = params.lon.replace('"',"'")
        exec('python3 /backend/weather_api.py "' + filteredLat + '" "' + filteredLon + '"', (error, stdout, stderr) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
            response.writeHead(200, {'Content-Type': 'json'})
            if (stdout) {
                response.end(stdout)
            }
            else {
                response.end('Serverside request to OWM weather API processed with errors, please try again later.')
            }
        })
        console.log('Weather request lat - ' + params.lat + ' lon - ' + params.lon)
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        console.log('Wrong request to OWM API')
    }
}
function owmApiForecast(request, response) {
    var params = url.parse(request.url,true).query
    if (params.lat && params.lon) {
        var filteredLat = params.lat.replace('"',"'")
        var filteredLon = params.lon.replace('"',"'")
        exec('python3 /backend/forecast_api.py "' + filteredLat + '" "' + filteredLon + '"', (error, stdout, stderr) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
            response.writeHead(200, {'Content-Type': 'json'})
            if (stdout) {
                response.end(stdout)
            }
            else {
                response.end('Serverside request to OWM forecast API processed with errors, please try again later.')
            }
        })
        console.log('Forecast request lat - ' + params.lat + ' lon - ' + params.lon)
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        console.log('Wrong request to OWM API')
    }
}
function googleTranslateApi(request, response) {
    var params = url.parse(request.url,true).query
    if (params.query && params.lang) {
        var filteredQuery = params.query.replace('"',"").replace("'",'')
        var filteradLang = params.lang.replace('"',"").replace("'",'')
        exec('python3 /backend/translate_api.py "' + filteredQuery + '" "' + filteradLang + '"', (error, stdout, stderr) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
            if (stdout) {
                response.end(stdout)
            }
            else {
                response.end('Google translate API not available, please try again later ...')
            }
        })
        console.log('Request to Google translate API target lang - ' + params.lang)
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        console.log('Wrong request to Google translate API')
    }
}
function currencyApi(request, response) {
    exec('cat /usr/share/nginx/html/app-data/currency.json', (error, stdout, stderr) => {
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
        response.writeHead(200, {'Content-Type': 'json'})
        if (stdout) {
            response.end(stdout)
        }
        else {
            response.end('Currencu API not available, please try again later ...')
        }
    })
    console.log('Request to currencu API')
}
function addressApi(request, response) {
    var params = url.parse(request.url,true).query
    if (params.query) {
        var filteredQuery = params.query.replace('"',"'")
        exec('python3 /backend/address_api.py "' + filteredQuery + '"', (error, stdout, stderr) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
            if (stdout) {
                response.end(stdout)
            }
            else {
                response.end('{"msg": "Address API not available, please try again later ..."}')
            }
        })
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        console.log('Wrong request to Address API')
    }
}
function initServer() {
    try {
        http.createServer(telegramApi).listen(8000)
        http.createServer(owmApiWeather).listen(8100)
        http.createServer(owmApiForecast).listen(8200)
        http.createServer(googleTranslateApi).listen(8300)
        http.createServer(currencyApi).listen(8400)
        http.createServer(addressApi).listen(8500)
    } catch (error) {
        initServer()
        console.log(error)
    }
}

initServer()