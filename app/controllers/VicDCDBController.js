'use strict';
/* Load Task Data Access Object */

const VicDCDBDao = require('../dao/VicDCDBDao');
const VicDao = require('../dao/VicDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class VicDCDBController {

    constructor() {
        this.vicDCDBDao = new VicDCDBDao();
        this.vicDao = new VicDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.vicDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let lot = req.query.lot;
        let plan = req.query.plan;
        this.vicDCDBDao.findByLegal(lot, plan).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.vicDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = VicDCDBController;