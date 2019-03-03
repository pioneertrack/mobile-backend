'use strict';
/* Load Task Data Access Object */

const NswDCDBDao = require('../dao/NswDCDBDao');
const NswDao = require('../dao/NswDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class ActDCDBController {

    constructor() {
        this.nswDCDBDao = new NswDCDBDao();
        this.nswDao = new NswDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.nswDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let lot = req.query.lot;
        let plan = req.query.plan;

        this.nswDCDBDao.findByLegal(lot, plan).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.nswDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = ActDCDBController;