'use strict';
/* Load Task Data Access Object */

const NtDCDBDao = require('../dao/NtDCDBDao');
const NtDao = require('../dao/NtDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class NtDCDBController {

    constructor() {
        this.ntDCDBDao = new NtDCDBDao();
        this.ntDao = new NtDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.ntDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let parcel = req.query.parcel;
        let survey_plan_number = req.query.survey_plan_number;

        this.ntDCDBDao.findByLegal(parcel, survey_plan_number).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.ntDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
}
module.exports = NtDCDBController;