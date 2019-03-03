'use strict';
/* Load Task entity */

const Qld = require('../models/qld');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class QldDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('qld');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM " + tablename + "  WHERE MRK_ID=${id}";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let qlds = [];
            for (const row of rows) {
                qlds.push(new Qld(row.ogc_fid, row.geom, row.objectid, row.mrk_id, row.alt1_nm, row.alt2_nm, row.alt3_nm, row.alt4_nm, row.town_nm, row.mossman, row.lclauth_nm, row.locality_d, row.relinfo_de, row.mrktype_de, row.install_nm, row.install_dt, row.mrkcnd_de, row.lastvisit_, row.form6_fg, row.cadcon_ct, row.srvplan1_i, row.srvplan1_d, row.srvplan2_i, row.srvplan2_d, row.srvplan3_i, row.srvplan3_d, row.srvplan4_i, row.srvplan4_d, row.srvplan5_i, row.srvplan5_d, row.gdalineage, row.gdalatitud, row.gdalongitu, row.gdahrzposu, row.gdacls_de, row.gdaacc_de, row.gdaheight, row.gdavrtposu, row.gdaadj_nm, row.gdafix_de, row.ahdlineage, row.ahdheight, row.ahdposu, row.ahdcls_de, row.ahdacc_de, row.ahdfix_de, row.ahdnlnsect, row.ahdoriginm, row.gdaadj_dt, row.ahdadj_dt, row.ahdphysica, row.ahdgeospho, row.ahdgsdat_d, row.ahdmodel_d, row.icon_id, row.easting, row.northing, row.zone, row.longitude, row.latitude, row.mb_id));
            }
            return qlds;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('qld');
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM ' + tablename + '  order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let qlds = [];
            for (const row of rows) {
                qlds.push(new Qld(row.ogc_fid, row.geom, row.objectid, row.mrk_id, row.alt1_nm, row.alt2_nm, row.alt3_nm, row.alt4_nm, row.town_nm, row.mossman, row.lclauth_nm, row.locality_d, row.relinfo_de, row.mrktype_de, row.install_nm, row.install_dt, row.mrkcnd_de, row.lastvisit_, row.form6_fg, row.cadcon_ct, row.srvplan1_i, row.srvplan1_d, row.srvplan2_i, row.srvplan2_d, row.srvplan3_i, row.srvplan3_d, row.srvplan4_i, row.srvplan4_d, row.srvplan5_i, row.srvplan5_d, row.gdalineage, row.gdalatitud, row.gdalongitu, row.gdahrzposu, row.gdacls_de, row.gdaacc_de, row.gdaheight, row.gdavrtposu, row.gdaadj_nm, row.gdafix_de, row.ahdlineage, row.ahdheight, row.ahdposu, row.ahdcls_de, row.ahdacc_de, row.ahdfix_de, row.ahdnlnsect, row.ahdoriginm, row.gdaadj_dt, row.ahdadj_dt, row.ahdphysica, row.ahdgeospho, row.ahdgsdat_d, row.ahdmodel_d, row.icon_id, row.easting, row.northing, row.zone, row.longitude, row.latitude, row.mb_id));
            }
            return qlds;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('qld');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + ' ';
        let pagingSql = 'SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM ' + tablename + '   LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let qlds = [];
            for (const row of data.rows) {
                qlds.push(new Qld(row.ogc_fid, row.geom, row.objectid, row.mrk_id, row.alt1_nm, row.alt2_nm, row.alt3_nm, row.alt4_nm, row.town_nm, row.mossman, row.lclauth_nm, row.locality_d, row.relinfo_de, row.mrktype_de, row.install_nm, row.install_dt, row.mrkcnd_de, row.lastvisit_, row.form6_fg, row.cadcon_ct, row.srvplan1_i, row.srvplan1_d, row.srvplan2_i, row.srvplan2_d, row.srvplan3_i, row.srvplan3_d, row.srvplan4_i, row.srvplan4_d, row.srvplan5_i, row.srvplan5_d, row.gdalineage, row.gdalatitud, row.gdalongitu, row.gdahrzposu, row.gdacls_de, row.gdaacc_de, row.gdaheight, row.gdavrtposu, row.gdaadj_nm, row.gdafix_de, row.ahdlineage, row.ahdheight, row.ahdposu, row.ahdcls_de, row.ahdacc_de, row.ahdfix_de, row.ahdnlnsect, row.ahdoriginm, row.gdaadj_dt, row.ahdadj_dt, row.ahdphysica, row.ahdgeospho, row.ahdgsdat_d, row.ahdmodel_d, row.icon_id, row.easting, row.northing, row.zone, row.longitude, row.latitude, row.mb_id));
            }
            return { count: data.row.count, features: qlds };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('qld');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude  ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM  " + tablename + "     \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let qlds = [];

            for (const row of rows) {

                qlds.push({ distance: row.d, feature: new Qld(row.ogc_fid, row.geom, row.objectid, row.mrk_id, row.alt1_nm, row.alt2_nm, row.alt3_nm, row.alt4_nm, row.town_nm, row.mossman, row.lclauth_nm, row.locality_d, row.relinfo_de, row.mrktype_de, row.install_nm, row.install_dt, row.mrkcnd_de, row.lastvisit_, row.form6_fg, row.cadcon_ct, row.srvplan1_i, row.srvplan1_d, row.srvplan2_i, row.srvplan2_d, row.srvplan3_i, row.srvplan3_d, row.srvplan4_i, row.srvplan4_d, row.srvplan5_i, row.srvplan5_d, row.gdalineage, row.gdalatitud, row.gdalongitu, row.gdahrzposu, row.gdacls_de, row.gdaacc_de, row.gdaheight, row.gdavrtposu, row.gdaadj_nm, row.gdafix_de, row.ahdlineage, row.ahdheight, row.ahdposu, row.ahdcls_de, row.ahdacc_de, row.ahdfix_de, row.ahdnlnsect, row.ahdoriginm, row.gdaadj_dt, row.ahdadj_dt, row.ahdphysica, row.ahdgeospho, row.ahdgsdat_d, row.ahdmodel_d, row.icon_id, row.easting, row.northing, row.zone, row.longitude, row.latitude, row.mb_id) });
            }

            return qlds;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('qld');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude   \
         FROM  " + tablename + "     \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let qlds = [];

            for (const row of rows) {

                qlds.push(new Qld(row.ogc_fid, row.geom, row.objectid, row.mrk_id, row.alt1_nm, row.alt2_nm, row.alt3_nm, row.alt4_nm, row.town_nm, row.mossman, row.lclauth_nm, row.locality_d, row.relinfo_de, row.mrktype_de, row.install_nm, row.install_dt, row.mrkcnd_de, row.lastvisit_, row.form6_fg, row.cadcon_ct, row.srvplan1_i, row.srvplan1_d, row.srvplan2_i, row.srvplan2_d, row.srvplan3_i, row.srvplan3_d, row.srvplan4_i, row.srvplan4_d, row.srvplan5_i, row.srvplan5_d, row.gdalineage, row.gdalatitud, row.gdalongitu, row.gdahrzposu, row.gdacls_de, row.gdaacc_de, row.gdaheight, row.gdavrtposu, row.gdaadj_nm, row.gdafix_de, row.ahdlineage, row.ahdheight, row.ahdposu, row.ahdcls_de, row.ahdacc_de, row.ahdfix_de, row.ahdnlnsect, row.ahdoriginm, row.gdaadj_dt, row.ahdadj_dt, row.ahdphysica, row.ahdgeospho, row.ahdgsdat_d, row.ahdmodel_d, row.icon_id, row.easting, row.northing, row.zone, row.longitude, row.latitude, row.mb_id));
            }
            return { x: x, y: y, markers: qlds };
        });
    }
}

module.exports = QldDao;