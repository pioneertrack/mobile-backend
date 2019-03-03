'use strict';
/* Load Task Data Access Object */

const TasDCDBDao = require('../dao/TasDCDBDao');
const TasDao = require('../dao/TasDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class TasDCDBController {

    constructor() {
        this.tasDCDBDao = new TasDCDBDao();
        this.tasDao = new TasDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.tasDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let lot = req.query.lot;
        let plan = req.query.plan;

        this.tasDCDBDao.findByLegal(lot, plan).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.tasDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = TasDCDBController;