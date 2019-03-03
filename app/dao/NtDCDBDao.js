'use strict';
/* Load Task entity */

const NtDCDB = require('../models/ntdcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class NtDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        /*
        SELECT UpdateGeometrySRID('nt_dcdb','wkb_geometry',3857);
        */
        // let tablename=database.getTableNames('nt_dcdb');
        let tablename = 'nt_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nts = [];
            for (const row of rows) {
                nts.push(new NtDCDB(row.ogc_fid, row.longitude, row.latitude, row.create_date, row.tenure_folio, row.street_name, row.ilis_link, row.parcel_type, row.ucv_per_m2, row.part, row.unit_count, row.ucv_date, row.owner_category, row.tenure_reference_description, row.parcel_area_m2, row.location_name, row.street_number, row.laiskey, row.tenure_status, row.street_number_part, row.location_code, row.tenure_reference_type, row.survey_plan_link, row.street_number_prefix, row.lto_code, row.tenure_reference_number, row.parcel, row.town_planning_zone, row.status_code, row.date_extracted, row.suburb, row.tenure_volume_type, row.property_name, row.ufi, row.parcel_label, row.survey_plan_number, row.admin_norm, row.tenure_volume, row.pfi, row.street_type, row.survey_id, row.ucv_amount));
            }
            return nts;
        });
    }
    findByLegal(parcel, survey_plan_number) {
        let tablename = database.getTableNames('nt_dcdb');
        //let tablename='nt_dcdb';
        let sqlRequest = 'SELECT AVG(ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as longitude,AVG(ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as latitude FROM ' + tablename + ' WHERE parcel=${parcel} and \
        survey_plan_number=${survey_plan_number} ';
        let sqlParams = { parcel: parcel, survey_plan_number: survey_plan_number.toUpperCase() };
        //console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            let nts = [];
            for (const row of rows) {
                 nts.push( new NtDCDB(row.ogc_fid,row.longitude,row.latitude,row.create_date  ,row.tenure_folio  ,row.street_name  ,row.ilis_link  ,
                    row.parcel_type  ,row.ucv_per_m2  ,row.part  ,row.unit_count  ,row.ucv_date  ,row.owner_category  ,
                    row.tenure_reference_description  ,row.parcel_area_m2  ,row.location_name  , row.street_number  ,
                    row.laiskey  ,row.tenure_status  ,row.street_number_part  ,row.location_code  ,
                    row.tenure_reference_type  ,row.survey_plan_link  ,row.street_number_prefix  ,row.lto_code  ,
                    row.tenure_reference_number  ,row.parcel  ,row.town_planning_zone  ,row.status_code  ,
                    row.date_extracted  ,row.suburb  ,row.tenure_volume_type  ,row.property_name  ,
                    row.ufi  ,row.parcel_label  ,row.survey_plan_number  ,row.admin_norm  , row.tenure_volume  ,
                    row.pfi  ,row.street_type  ,   row.survey_id  ,row.ucv_amount )
                );
            }
            return nts;
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

module.exports = NtDCDBDao;