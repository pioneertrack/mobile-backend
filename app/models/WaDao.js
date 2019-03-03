'use strict';
/* Load Task entity */

const Wa = require('../models/wa');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class WaDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('wa');
        let sqlRequest = "SELECT *  ,ST_AsGeoJSON(wkb_geometry) as geom FROM " + tablename + " WHERE geodetic_point_name=${id}";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let was = [];
            for (const row of rows) {
                was.push(new Wa(row.ogc_fid, row.geom, row.objectid, row.point_number, row.point_type, row.geodetic_point_name, row.stamped_name_on_point, row.latest_status_description, row.latest_status_date, row.cadastral_connection, row.horiz_datum, row.latitude_dd, row.longitude_dd, row.projection, row.easting, row.northing, row.zone, row.horizontal_circular_error, row.horiz_method, row.horiz_accuracy, row.vert_datum, row.reduced_level, row.vert_accuracy, row.vertical_method, row.url, row.render_value, row.filter_value, row.mb_id));
            }
            return was;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('wa');
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let was = [];
            for (const row of rows) {
                was.push(new Wa(row.ogc_fid, row.geom, row.objectid, row.point_number, row.point_type, row.geodetic_point_name, row.stamped_name_on_point, row.latest_status_description, row.latest_status_date, row.cadastral_connection, row.horiz_datum, row.latitude_dd, row.longitude_dd, row.projection, row.easting, row.northing, row.zone, row.horizontal_circular_error, row.horiz_method, row.horiz_accuracy, row.vert_datum, row.reduced_level, row.vert_accuracy, row.vertical_method, row.url, row.render_value, row.filter_value, row.mb_id));
            }
            return was;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('wa');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom   FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let was = [];
            for (const row of data.rows) {
                was.push(new Wa(row.ogc_fid, row.geom, row.objectid, row.point_number, row.point_type, row.geodetic_point_name, row.stamped_name_on_point, row.latest_status_description, row.latest_status_date, row.cadastral_connection, row.horiz_datum, row.latitude_dd, row.longitude_dd, row.projection, row.easting, row.northing, row.zone, row.horizontal_circular_error, row.horiz_method, row.horiz_accuracy, row.vert_datum, row.reduced_level, row.vert_accuracy, row.vertical_method, row.url, row.render_value, row.filter_value, row.mb_id));
            }
            return { count: data.row.count, features: was };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('wa');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let was = [];
            for (const row of rows) {
                was.push({ distance: row.d, feature: new Wa(row.ogc_fid, row.geom, row.objectid, row.point_number, row.point_type, row.geodetic_point_name, row.stamped_name_on_point, row.latest_status_description, row.latest_status_date, row.cadastral_connection, row.horiz_datum, row.latitude_dd, row.longitude_dd, row.projection, row.easting, row.northing, row.zone, row.horizontal_circular_error, row.horiz_method, row.horiz_accuracy, row.vert_datum, row.reduced_level, row.vert_accuracy, row.vertical_method, row.url, row.render_value, row.filter_value, row.mb_id) });
            }
            return was;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('wa');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude   \
         FROM  " + tablename + "     \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let was = [];
            for (const row of rows) {
                was.push({ distance: row.d, feature: new Wa(row.ogc_fid, row.geom, row.objectid, row.point_number, row.point_type, row.geodetic_point_name, row.stamped_name_on_point, row.latest_status_description, row.latest_status_date, row.cadastral_connection, row.horiz_datum, row.latitude_dd, row.longitude_dd, row.projection, row.easting, row.northing, row.zone, row.horizontal_circular_error, row.horiz_method, row.horiz_accuracy, row.vert_datum, row.reduced_level, row.vert_accuracy, row.vertical_method, row.url, row.render_value, row.filter_value, row.mb_id) });
            }

            return { x: x, y: y, markers: was };
        });
    }

}

module.exports = WaDao;