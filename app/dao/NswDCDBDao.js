'use strict';
/* Load Task entity */

const NswDCDB = require('../models/nswdcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class NswDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        //·let tablename=database.getTableNames('nsw_dcdb');
        let tablename = 'nsw_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new NswDCDB(row.ogc_fid, row.geometry, row.objectid, row.cadid, row.createdate, row.modifieddate, row.controllingauthorityoid, row.planoid, row.plannumber, row.planlabel, row.itstitlestatus, row.itslotid, row.stratumlevel, row.hasstratum, row.classsubtype, row.lotnumber, row.sectionnumber, row.planlotarea, row.planlotareaunits, row.startdate, row.enddate, row.lastupdate, row.msoid, row.centroidid, row.shapeuuid, row.changetype, row.lotidstring, row.processstate, row.urbanity));
            }
            return nsws;
        });
    }
    findByLegal(lot, plan) {
        //let tablename='nsw_dcdb';
        // let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(geometry,4326))) as latitude FROM '+tablename+' WHERE  \
        // lotnumber=${lotnumber} and plannumber=${plannumber} ';
        let tablename = database.getTableNames('nsw_dcdb');
        let sqlRequest = 'SELECT AVG(ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as longitude,AVG(ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as latitude FROM ' + tablename + ' WHERE  \
        lotnumber=${lotnumber} and plannumber=${plannumber} ';
        let sqlParams = { lotnumber: lot, plannumber: plan };
        //console.log(sqlParams);
        console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            let nsws = [];
            for (const row of rows) {
                nsws.push( new NswDCDB(row.ogc_fid,null,row.objectid,row.cadid,row.createdate,row.modifieddate,row.controllingauthorityoid,row.planoid,row.plannumber,row.planlabel,
                    row.itstitlestatus,row.itslotid,row.stratumlevel,row.hasstratum,row.classsubtype,row.lotnumber,row.sectionnumber,row.planlotarea,row.planlotareaunits,row.startdate,row.enddate,row.lastupdate,row.msoid,row.centroidid,
                    row.shapeuuid,row.changetype,row.lotidstring,row.processstate,row.urbanity,row.latitude,row.longitude)
                );
            }
            return nsws;
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

module.exports = NswDCDBDao;