'use strict';
/* Load Task Data Access Object */

const ActDCDBDao = require('../dao/ActDCDBDao');
const ActDao = require('../dao/ActDao');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');
var Promise = require('bluebird');
class ActDCDBController {

    constructor() {
        this.actDCDBDao = new ActDCDBDao();
        this.actDao = new ActDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.actDCDBDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let section_number = parseInt(req.query.section_number, 10);
        let block_number = parseInt(req.query.block_number, 10);
        let district_name = req.query.district_name;
        let division_name = req.query.division_name;
        this.actDCDBDao.findByLegal(section_number, block_number, district_name, division_name).then(data => {
            console.log(data);
            if (data == null) {
                return Promise.reject('not found');
            }
            return this.actDao.findByNearstByLegal(data.x, data.y, 15);
        }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }

}
module.exports = ActDCDBController;