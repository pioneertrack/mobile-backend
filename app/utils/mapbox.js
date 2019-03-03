'use strict';

var Promise = require('bluebird');
const mapconfig = require('../config/mapconfig');
const request = require('request');
function rgeocoding(x, y) {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + x + ',' + y + '.json?access_token=' + mapconfig.mapbox_key;

    return new Promise(function (resolve, reject) {
        var r = request.defaults({ 'proxy': 'http://127.0.0.1:8118' });
        request.get(url, {
            json: true
        }, (err, res, body) => {
            console.log(body);
            if (err) {
                console.log("error");
                reject(err);
            } else {

                if (body.features.length > 0) {

                    console.log(body.features[0].place_name);
                    resolve({ address: body.features[0].place_name });
                } else {
                    reject("not found");
                }
            }
        });
    });
}
module.exports = {
    rgeocoding: rgeocoding
};