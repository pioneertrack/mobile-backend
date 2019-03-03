'use strict';
/* Load Task Data Access Object */

const StateDao = require('../dao/StateDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class StateController {

    constructor() {
        this.dao = new StateDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.dao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    findAll(req, res) {
        this.dao.findAll().then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    findByLocation(req, res) {
        //console.log(req);
        let x = req.query.x;
        let y = req.query.y;
        if (!x || !y) {
            this.common.findError(res);
        } else {

            this.dao.findByLocation(x, y).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        }
    }

}
module.exports = StateController;