
'use strict';
/* Load Task Data Access Object */

const StreetDao = require('../dao/StreetDao');
const ActDao = require('../dao/ActDao');
const NswDao = require('../dao/NswDao');
const NtDao = require('../dao/NtDao');
const QldDao = require('../dao/QldDao');
const SaDao = require('../dao/SaDao');
const TasDao = require('../dao/TasDao');
const WaDao = require('../dao/WaDao');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class StreetController {

    constructor() {
        this.streetDao = new StreetDao();
        this.actDao = new ActDao();
        this.nswDao = new NswDao();
        this.ntDao = new NtDao();
        this.qldDao = new QldDao();
        this.saDao = new SaDao();
        this.tasDao = new TasDao();
        this.waDao = new WaDao();
        this.common = new ControllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.streetDao.findById(id).then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    findAll(req, res) {
        this.streetDao.findAll().then(this.common.findSuccess(res)).catch(this.common.findError(res));
    }
    query(req, res) {
        let pageNum = req.query.pageNum;
        let pageCount = req.query.pageCount;
        let legalid = req.query.legalid;
        var n = req.query.n;
        if (!n) {
            n = 10;
        }
        if (legalid) {
            this.streetDao.findByLegalId(legalid).then(rows => {
                if (rows.length > 0) {
                    console.log(rows[0].gid);
                    let stateS = rows[0]["state"];
                    console.log(stateS);
                    if (stateS === "NSW") {
                        return this.nswDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "ACT") {
                        return this.actDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "NT") {
                        return this.ntDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "QLD") {
                        return this.qldDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "SA") {
                        return this.saDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "TAS") {
                        return this.tasDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else if (stateS === "WA") {
                        return this.waDao.findByNearst(Number(rows[0].longitude), Number(rows[0].latitude), n);
                    } else {
                        return [];
                    }
                } else {

                    return [];
                }
            }).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        } else {
            if (!pageCount) {
                pageCount = 10;
            }
            if (!pageNum) {
                pageNum = 1;
            }
            this.streetDao.findByPaging(pageNum, pageCount).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        }
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
            this.streetDao.findByNearst(x, y, n).then(this.common.findSuccess(res)).catch(this.common.findError(res));
        }
    }
}
module.exports = StreetController;