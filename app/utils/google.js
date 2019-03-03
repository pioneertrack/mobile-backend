'use strict';

var Promise = require('bluebird');
const mapconfig = require('../config/mapconfig');
const serverconfig = require('../config/serverconfig');
const request = require('request');

function toMapView(x, y, data) {

    var zoom = 18;
    var url = '';
    var centerView = encodeURIComponent('https://wupuphoto.oss-cn-huhehaote.aliyuncs.com/web/center.png');
    var centerIconUrl = 'url-' + centerView + '(' + x + ',' + y + ')';
    var streetView = encodeURIComponent('https://wupuphoto.oss-cn-huhehaote.aliyuncs.com/web/streetview.png');

    var streetIconUrl = '';
    if (data.location != null) {
        streetIconUrl = ',url-' + streetView + '(' + data.location.lng + ',' + data.location.lat + ')';
    }
    var iconUrl = centerIconUrl + streetIconUrl;
    url = 'https://api.mapbox.com/v4/mapbox.streets/' + iconUrl + '/' + x + ',' + y + ',' + zoom + '/400x400.png?access_token=' + mapconfig.mapbox_key;

    console.log(url);

    return url;
}
function toSatelliteView(x, y) {
    let zoom = 12;
    var url = 'https://api.mapbox.com/v4/mapbox.satellite/' + x + ',' + y + ',' + zoom + '/400x400.png?access_token=' + mapconfig.mapbox_key;
    return url;
}
function toStreetView(x, y) {
    var metaurl = 'https://maps.googleapis.com/maps/api/streetview/metadata?size=400x400&location=' + y + ',' + x + '&fov=100' + '&pitch=-15&source=outdoor&key=' + mapconfig.streetView_key;
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + y + ',' + x + '&fov=100' + '&pitch=-15&source=outdoor&key=' + mapconfig.streetView_key;
    console.log(url);
    return new Promise(function (resolve, reject) {
        var r = request.defaults({ 'proxy': 'http://127.0.0.1:8118' });
        request.get(metaurl, {
            json: true
        }, (err, res, body) => {
            console.log(body);
            if (err) {
                console.log("error");
                reject(err);
            } else {

                if (body.status == 'OK') {
                    var dx = x - body.location.lng;
                    var dy = y = body.location.lat;
                    var heading = Math.atan2(dy, dx);
                    console.log(heading);
                    resolve({ url: url, date: body.date, location: body.location });
                } else {
                    var noUrl = toSatelliteView(x, y);
                    console.log(noUrl);
                    resolve({ url: noUrl, date: null, location: null });
                }
            }
        });
    });
}
module.exports = {
    toMapView: toMapView,
    toStreetView: toStreetView
};