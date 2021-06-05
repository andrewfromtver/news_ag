let http = require("http")
let exec = require('child_process').exec
let url = require("url")
let fs = require('fs')

function telegramApi(request, response) {
    let params = url.parse(request.url,true).query
    if (params.name && params.email && params.msg) {
        let clearName = params.name.replace('"',"").replace("'",'')
        let clearMsg = params.msg.replace('"',"").replace("'",'')
        let clearEmail = params.email.replace('"',"").replace("'",'')
        exec('python3 /backend/telegram_api.py "' + clearName + '" "' + clearEmail + '" "' + clearMsg + '"')
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
        response.writeHead(200, {'Content-Type': 'text/plain'})
        response.end('Serverside request to Telegram API processed successfully')
        fs.writeFile(
            '/telegram_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> New message from web form - name: ' + clearName + ' | email: ' + clearEmail + '\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        fs.writeFile(
            '/telegram_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Wrong request to Telegram API\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
}
function owmApiWeather(request, response) {
    let params = url.parse(request.url,true).query
    if (params.lat && params.lon) {
        let filteredLat = params.lat.replace('"',"").replace("'",'')
        let filteredLon = params.lon.replace('"',"").replace("'",'')
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
        fs.writeFile(
            '/weather_forecast_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Weather request lat - ' + params.lat + ' lon - ' + params.lon + '\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        fs.writeFile(
            '/weather_forecast_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Wrong request to weather API\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
}
function owmApiForecast(request, response) {
    let params = url.parse(request.url,true).query
    if (params.lat && params.lon) {
        let filteredLat = params.lat.replace('"',"'")
        let filteredLon = params.lon.replace('"',"'")
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
        fs.writeFile(
            '/weather_forecast_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Forecast request lat - ' + params.lat + ' lon - ' + params.lon + '\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        fs.writeFile(
            '/weather_forecast_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Wrong request to forecast API\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
}
function googleTranslateApi(request, response) {
    let params = url.parse(request.url,true).query
    if (params.query && params.lang) {
        let filteredQuery = params.query.replace('"',"").replace("'",'')
        let filteradLang = params.lang.replace('"',"").replace("'",'')
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
        fs.writeFile(
            '/translate_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Request to translate API target lang - ' + params.lang + '\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('404')
        fs.writeFile(
            '/translate_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Wrong request to translate API\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
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
    fs.writeFile(
        '/currency_api.log', 
        '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Request to currencu API\n',
        { flag: 'a+' },
        err => {
            if (err) {
              console.error(err)
              return
            }
        }
    )
}
function addressApi(request, response) {
    let params = url.parse(request.url,true).query
    if (params.query) {
        let filteredQuery = params.query.replace('"',"'")
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
        fs.writeFile(
            '/address_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> Wrong request to address API\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
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
        fs.writeFile(
            '/address_api.log', 
            '\n' +new Date().getFullYear()+ "-" +("0" + (new Date().getMonth() + 1)).slice(-2)+ "-" +("0" + new Date().getDate()).slice(-2)+ " " +new Date().getHours()+ ":" +new Date().getMinutes()+ ":" +new Date().getSeconds()+' -> ' + error + '\n',
            { flag: 'a+' },
            err => {
                if (err) {
                  console.error(err)
                  return
                }
            }
        )
    }
}

initServer()