'use strict';
/* Load Task entity */

const ActDCDB = require('../models/actdcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class ActDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        //·let tablename=database.getTableNames('act_dcdb');
        let tablename = 'act_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let acts = [];
            for (const row of rows) {
                acts.push(new ActDCDB(row.ogc_fid, row.longitude, row.latitude, row.objectid, row.block_derived_area, row.block_leased_area, row.block_key, row.block_number, row.section_number, row.current_lifecycle_stage, row.addresses, row.plan_numbers, row.volume_folio, row.land_use_policy_zones, row.overlay_provision_zones, row.water_flag, row.stratum_datum_id, row.ground_level, row.stratum_lowest_level, row.stratum_highest_level, row.division_code, row.division_name, row.district_code, row.district_name, row.cuc, row.tp_written_statement, row.url, row.type, row.last_update));
            }
            return acts;
        });
    }
    findByLegal(section_number, block_number, district_name, division_name) {
        /*
        let tablename='act_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(geometry,4326))) as latitude FROM '+tablename+' WHERE section_number=${section_number} and \
        block_number=${block_number} and district_name=${district_name} and division_name=${division_name}';
        */

        let tablename = database.getTableNames('act_dcdb');
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude FROM ' + tablename + ' WHERE section_number=${section_number} and \
        block_number=${block_number}  and division_name=${division_name}';

        let sqlParams = { section_number: section_number, block_number: block_number, division_name: division_name.toUpperCase() };
        //console.log(sqlParams);
        //console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            let acts = [];
            for (const row of rows) {
                acts.push( new ActDCDB(row.ogc_fid   ,row.longitude,row.latitude,row.objectid,row.block_derived_area,row.block_leased_area  ,row.block_key  ,row.block_number  ,
                    row.section_number  ,row.current_lifecycle_stage  ,row.addresses  ,row.plan_numbers  ,row.volume_folio  ,
                    row.land_use_policy_zones  ,row.overlay_provision_zones  ,row.water_flag  ,row.stratum_datum_id  ,
                    row.ground_level  ,row.stratum_lowest_level  ,row.stratum_highest_level  ,row.division_code  ,row.division_name  ,
                    row.district_code  ,row.district_name  ,row.cuc  ,row.tp_written_statement  ,row.url  ,row.type  ,row.last_update)
                );
            }
            return acts;
            */
            var result = null;
            console.log(rows);
            if (rows.length > 0) {
                result = { x: rows[0].longitude, y: rows[0].latitude };
            }

            return result;
        });
    }

}

module.exports = ActDCDBDao;