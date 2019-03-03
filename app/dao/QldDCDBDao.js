'use strict';
/* Load Task entity */

const QldDCDB = require('../models/qlddcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class QldDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        //·let tablename=database.getTableNames('qld_dcdb');
        let tablename = 'qld_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            var qlds = [];
            for (const row of rows) {
                qlds.push(new QldDCDB(row.ogc_fid, row.geometry, row.objectid, row.lot, row.plan, row.lotplan, row.seg_num, row.par_num, row.segpar, row.par_ind, row.lot_area, row.excl_area, row.lot_volume, row.surv_ind, row.tenure, row.prc, row.parish, row.county, row.lac, row.shire_name, row.feat_name, row.alias_name, row.loc, row.locality, row.parcel_typ, row.cover_typ, row.acc_code, row.ca_area_sqm, row.se_anno_cad_data));
            }
            return qlds;
        });
    }
    findByLegal(lot, plan) {
        let tablename = database.getTableNames('qld_dcdb');
        let sqlRequest = 'SELECT AVG(ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as longitude,AVG(ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as latitude FROM ' + tablename + ' WHERE  \
        lot=${lot} and plan=${plan} ';
        //let tablename='qld_dcdb';
        //let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude FROM '+tablename+' WHERE  \
        //lot=${lot} and plan=${plan} ';
        let sqlParams = { lot: lot, plan: plan.toUpperCase() };
        console.log(sqlParams);
        console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            var qlds = [];
            for (const row of rows) {
                qlds.push( new QldDCDB(row.ogc_fid, row.geometry, row.objectid, row.lot, row.plan, row.lotplan, row.seg_num, row.par_num, row.segpar, row.par_ind, row.lot_area, row.excl_area, row.lot_volume,
                    row.surv_ind, row.tenure, row.prc, row.parish, row.county, row.lac, row.shire_name, row.feat_name, 
                    row.alias_name, row.loc, row.locality, row.parcel_typ, row.cover_typ, row. acc_code, row.ca_area_sqm, row.se_anno_cad_data,row.latitude,row.longitude)
                );
            }
            return qlds;
            */
            var result = null;
            console.log(rows);
            if (rows.length > 0 && rows[0].longitude != null) {
                result = { x: rows[0].longitude, y: rows[0].latitude };
            }

            return result;
        });
    }

}

module.exports = QldDCDBDao;