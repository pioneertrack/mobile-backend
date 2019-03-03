'use strict';
/* Load Task Data Access Object */

const ActDao = require('../dao/ActDao');
var ejs = require('../utils/ejs');
var pdf = require('../utils/pdf');
var google = require('../utils/google');
var uuid = require('uuid');
var path = require('path');
var mapbox = require('../utils/mapbox');
var moment = require('moment');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class ActController {

    constructor() {
        this.actDao = new ActDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.actDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    findByIdParam(req, res) {
        let id = req.query.id;
        let f = req.query.f;
        if (f == 'pdf') {
            this.actDao.findById(id).then(data => {

                if (data.length == 0) {
                    reject({ 'error': 'not found' });
                }
                var temp = data[0];
                temp.createtime = new Date().toISOString().slice(0, 10);
                temp.year = temp.createtime.substring(-4);
                temp.title = 'Survey Control Mark Report , ACT';

                return temp;
            }).then(temp => {

                return google.toStreetView(temp.longitude, temp.latitude).then(data => {
                    temp.url = data.url;

                    if (data.date) {
                        temp.img_capture_date = 'Image Capture: ' + data.date;
                    } else {
                        temp.img_capture_date = '';
                    }
                    temp.mapUrl = google.toMapView(temp.longitude, temp.latitude, data);

                    return temp;
                });
            }).then(temp => {
                return mapbox.rgeocoding(temp.longitude, temp.latitude).then(data => {
                    temp.address = data.address;
                    return temp;
                });
            }).then(temp => {

                temp.longitude = temp.longitude.toString().substring(0, 6);
                temp.latitude = temp.latitude.toString().substring(0, 6);

                return ejs.toHTML('./es6/app/templates/act.ejs', temp);
            }).then(function (html) {
                var assetPath = path.join(__dirname, '../../../public/');
                var options = { 'format': 'A4', 'orientation': 'portrait', base: "file://" + assetPath };
                var result = 'data/out/pdf_' + uuid.v1() + '.pdf';
                var output = path.join(__dirname, '../../../public/' + result);

                return pdf.toPDF(html, options, output);
            }).then(response => {
                var fileName = response.filename;
                var idx = fileName.indexOf('/data');
                fileName = fileName.substring(idx);
                return { fileName: fileName };
            }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        } else {
            this.actDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        }
    }
    findAll(req, res) {
        this.actDao.findAll().then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let pageNum = req.query.pageNum;
        let pageCount = req.query.pageCount;
        if (!pageCount) {
            pageCount = 10;
        }
        if (!pageNum) {
            pageNum = 1;
        }
        this.actDao.findByPaging(pageNum, pageCount).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    nearst(req, res) {
        let n = req.query.n;
        if (!n) {
            n = 10;
        }
        let x = req.query.x;
        let y = req.query.y;
        if (!x || !y) {
            this.common.findError(res);
        } else {
            this.actDao.findByNearst(x, y, n).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        }
    }
}
module.exports = ActController;