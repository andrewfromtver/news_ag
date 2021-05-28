var http = require("http")
var exec = require('child_process').exec
var url = require("url")

function telegramApi(request, response) {
    var params = url.parse(request.url,true).query;
    exec("python3 /backend/telegram_api.py " + params.name + ' ' + params.email + ' ' + params.msg)
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Serverside request to Telegram API processed successfully');
}

function owmApiWeather(request, response) {
    var params = url.parse(request.url,true).query;
    exec("python3 /backend/weather_api.py " + params.lat + ' ' + params.lon, (error, stdout, stderr) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.writeHead(200, {'Content-Type': 'json'});
        if (stdout) {
            response.end(stdout);
        }
        else {
            response.end('Serverside request to OWM weather API processed with errors, please try again later.');
        }
    })
}

function owmApiForecast(request, response) {
    var params = url.parse(request.url,true).query;
    exec("python3 /backend/forecast_api.py " + params.lat + ' ' + params.lon, (error, stdout, stderr) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.writeHead(200, {'Content-Type': 'json'});
        if (stdout) {
            response.end(stdout);
        }
        else {
            response.end('Serverside request to OWM forecast API processed with errors, please try again later.');
        }
    })
}

function googleTranslateApi(request, response) {
    var params = url.parse(request.url,true).query;
    exec("python3 /backend/translate_api.py " + params.query + ' ' + params.lang, (error, stdout, stderr) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        if (stdout) {
            response.end(stdout);
        }
        else {
            response.end('Google translate API not available, please try again later ...');
        }
    })
}

http.createServer(telegramApi).listen(8000)
http.createServer(owmApiWeather).listen(8100)
http.createServer(owmApiForecast).listen(8200)
http.createServer(googleTranslateApi).listen(8300)