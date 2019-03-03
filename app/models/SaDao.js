'use strict';
/* Load Task entity */

const Sa = require('../models/sa');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class SaDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('sa');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(wkb_geometry) as geom FROM " + tablename + " WHERE mark_no=${id}";
        let sqlParams = { id: id };
        //console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let sas = [];
            for (const row of rows) {
                sas.push(new Sa(row.ogc_fid, row.geom, row.objectid, row.longitude, row.latitude, row.height, row.mark_no, row.zone, row.easting, row.northing, row.h_datum, row.h_order, row.h_fixing, row.h_purpose, row.h_authorit, row.h_adjusted, row.h_position, row.h_entrydat, row.h_comment, row.v_datum, row.gs_sep, row.v_order, row.v_fixing, row.v_purpose, row.v_authorit, row.v_adjusted, row.v_position, row.v_entrydat, row.v_comment, row.marktype, row.specattrib, row.gone, row.wasnow, row.dupmarkno, row.symbology, row.mb_id));
            }
            return sas;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('sa');
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let sas = [];
            for (const row of rows) {
                sas.push(new Sa(row.ogc_fid, row.geom, row.objectid, row.longitude, row.latitude, row.height, row.mark_no, row.zone, row.easting, row.northing, row.h_datum, row.h_order, row.h_fixing, row.h_purpose, row.h_authorit, row.h_adjusted, row.h_position, row.h_entrydat, row.h_comment, row.v_datum, row.gs_sep, row.v_order, row.v_fixing, row.v_purpose, row.v_authorit, row.v_adjusted, row.v_position, row.v_entrydat, row.v_comment, row.marktype, row.specattrib, row.gone, row.wasnow, row.dupmarkno, row.symbology, row.mb_id));
            }
            return sas;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('sa');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom   FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let sas = [];
            for (const row of data.rows) {
                sas.push(new Sa(row.ogc_fid, row.geom, row.objectid, row.longitude, row.latitude, row.height, row.mark_no, row.zone, row.easting, row.northing, row.h_datum, row.h_order, row.h_fixing, row.h_purpose, row.h_authorit, row.h_adjusted, row.h_position, row.h_entrydat, row.h_comment, row.v_datum, row.gs_sep, row.v_order, row.v_fixing, row.v_purpose, row.v_authorit, row.v_adjusted, row.v_position, row.v_entrydat, row.v_comment, row.marktype, row.specattrib, row.gone, row.wasnow, row.dupmarkno, row.symbology, row.mb_id));
            }
            return { count: data.row.count, features: sas };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('sa');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];
        //console.log(sqlParams);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let sas = [];
            //console.log(rows);
            for (const row of rows) {
                sas.push(new Sa(row.ogc_fid, row.geom, row.objectid, row.longitude, row.latitude, row.height, row.mark_no, row.zone, row.easting, row.northing, row.h_datum, row.h_order, row.h_fixing, row.h_purpose, row.h_authorit, row.h_adjusted, row.h_position, row.h_entrydat, row.h_comment, row.v_datum, row.gs_sep, row.v_order, row.v_fixing, row.v_purpose, row.v_authorit, row.v_adjusted, row.v_position, row.v_entrydat, row.v_comment, row.marktype, row.specattrib, row.gone, row.wasnow, row.dupmarkno, row.symbology, row.mb_id));
            }
            return sas;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('sa');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude   \
         FROM  " + tablename + "     \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";
        console.log(sqlRequest);
        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let sas = [];

            for (const row of rows) {
                sas.push(new Sa(row.ogc_fid, row.geom, row.objectid, row.longitude, row.latitude, row.height, row.mark_no, row.zone, row.easting, row.northing, row.h_datum, row.h_order, row.h_fixing, row.h_purpose, row.h_authorit, row.h_adjusted, row.h_position, row.h_entrydat, row.h_comment, row.v_datum, row.gs_sep, row.v_order, row.v_fixing, row.v_purpose, row.v_authorit, row.v_adjusted, row.v_position, row.v_entrydat, row.v_comment, row.marktype, row.specattrib, row.gone, row.wasnow, row.dupmarkno, row.symbology, row.mb_id));
            }

            return { x: x, y: y, markers: sas };
        });
    }
}

module.exports = SaDao;