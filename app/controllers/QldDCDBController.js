'use strict';
/* Load Task Data Access Object */

const QldDCDBDao = require('../dao/QldDCDBDao');
const QldDao = require('../dao/QldDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class QldDCDBController {

    constructor() {
        this.qldDCDBDao = new QldDCDBDao();
        this.qldDao = new QldDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.qldDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let lot = req.query.lot;
        let plan = req.query.plan;

        this.qldDCDBDao.findByLegal(lot, plan).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.qldDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = QldDCDBController;