const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidXR0YW00OSIsImEiOiJjbGNvd2t0amoxc25rM3dwY3lvbW9ueW95In0.APmpLsraFQpHRXTt0DyCug';
    request({url,json : true} , (error,{body}= {}) => {
        if ( error ) {
            callback("unable to connect",undefined);
        } else if ( body.features.length === 0 ) {
            callback("Unable to find location",undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            callback(undefined,{
                longitude : longitude,
                latitude : latitude,
                location : body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;