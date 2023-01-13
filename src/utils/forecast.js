const request = require('request');

const forecast = (lat,lng,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f5c40147d1447d456d35fe27c80a9a5&query='+lat+','+lng;
    request({ url,json : true} , (error,{body}= {}) => {
        if ( error ) {
            callback("unable to connect",undefined);
        } else if ( body.error ) {
            callback("Have an error",undefined);
        } else {
            const data = body.current;
            const string = 'Temperatrue is '+ data.temperature +' but feels like '+ data.feelslike;
            callback(undefined,string);
        }
    });
}

module.exports = forecast;