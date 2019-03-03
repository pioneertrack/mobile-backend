'use strict';
/* Load Task entity */

const TasDCDB = require('../models/tasdcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class TasDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        //·let tablename=database.getTableNames('tas_dcdb');
        let tablename = 'tas_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            var tass = [];
            for (const row of rows) {
                tass.push(new TasDCDB(row.ogc_fid, row.geometry, row.objectid, row.folio, row.comp_area, row.meas_area, row.row.pid, row.pot_pid, row.cad_type1, row.cad_type2, row.tenure_ty, row.feat_name, row.strata_lev, row.prop_name, row.cid, row.lpi, row.prop_add, row.prop_add1, row.prop_add2, row.prop_add3));
            }
            return tass;
        });
    }
    findByLegal(lot, plan) {
        let tablename = database.getTableNames('tas_dcdb');
        //let tablename='tas_dcdb';
        //let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude FROM '+tablename+' WHERE  \
        //folio=${folio} and volume=${volume} ';
        let sqlRequest = 'SELECT AVG(ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as longitude,AVG(ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as latitude FROM ' + tablename + ' WHERE  \
        folio=${folio} and volume=${volume} ';
        let sqlParams = { folio: lot, volume: plan };
        //console.log(sqlParams);
        console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            var tass = [];
            for (const row of rows) {
                tass.push( new TasDCDB(row.ogc_fid, row.geometry, row.objectid,row.folio,
                    row.comp_area,row.meas_area,row.pid,row.pot_pid,row.cad_type1,
                    row.cad_type2,row.tenure_ty,row.feat_name,row.strata_lev,row.prop_name,
                    row.cid,row.lpi,row.prop_add,row.prop_add1,row.prop_add2,row.prop_add3,row.latitude,row.longitude)
                );
            }
            return tass;
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

module.exports = TasDCDBDao;