'use strict';
/* Load Task Data Access Object */

const LegalDao = require('../dao/LegalDao');
const SaDao = require('../dao/SaDao');
const WaDao = require('../dao/WaDao');
var Promise = require('bluebird');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class LegalController {

    constructor() {
        this.legalDao = new LegalDao();
        this.waDao = new WaDao();
        this.saDao = new SaDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.legalDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

    query(req, res) {
        let state = req.query.state;
        let lot = req.query.lot;
        let plan = req.query.plan;

        this.legalDao.findByLegalLotPlan(lot, plan, state).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            if (state.toUpperCase == 'WA') {
                return this.waDao.findByNearstByLegal(data.x, data.y, 15);
            } else if (state.toUpperCase == 'SA') {
                return this.saDao.findByNearstByLegal(data.x, data.y, 15);
            } else {
                return Promise.reject('not found');
            }
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = LegalController;