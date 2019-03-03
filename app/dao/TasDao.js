
'use strict';
/* Load Task entity */

const Tas = require('../models/tas');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class TasDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('tas');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom, \
         ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
        ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM " + tablename + " WHERE site_pk_id=${id}";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let tass = [];
            for (const row of rows) {
                tass.push(new Tas(row.ogc_fid, row.geom, row.objectid, row.pack_id, row.site_pk_id, row.order_symb, row.scs_name, row.zone, row.easting, row.northing, row.hor_datum, row.hor_class, row.hor_order, row.target_str, row.height, row.hgt_datum, row.hgt_class, row.hgt_order, row.markstatus, row.descript, row.ist_guid, row.mb_id, row.longitude, row.latitude));
            }
            return tass;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('tas');
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom , \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let tass = [];
            for (const row of rows) {
                tass.push(new Tas(row.ogc_fid, row.geom, row.objectid, row.pack_id, row.site_pk_id, row.order_symb, row.scs_name, row.zone, row.easting, row.northing, row.hor_datum, row.hor_class, row.hor_order, row.target_str, row.height, row.hgt_datum, row.hgt_class, row.hgt_order, row.markstatus, row.descript, row.ist_guid, row.mb_id, row.longitude, row.latitude));
            }
            return tass;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('tas');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom  , \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
       ST_Y(ST_Transform(wkb_geometry,4326)) as latitude FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let tass = [];
            for (const row of data.rows) {
                tass.push(new Tas(row.ogc_fid, row.geom, row.objectid, row.pack_id, row.site_pk_id, row.order_symb, row.scs_name, row.zone, row.easting, row.northing, row.hor_datum, row.hor_class, row.hor_order, row.target_str, row.height, row.hgt_datum, row.hgt_class, row.hgt_order, row.markstatus, row.descript, row.ist_guid, row.mb_id, row.longitude, row.latitude));
            }
            return { count: data.row.count, features: tass };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('tas');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom , \
            ST_X(ST_Transform(geometry,4326)) as longitude, \
           ST_Y(ST_Transform(geometry,4326)) as latitude,st_distance(geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
             FROM " + tablename + "    \
             ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let tass = [];
            for (const row of rows) {
                tass.push({ distance: row.d, feature: new Tas(row.ogc_fid, row.geom, row.objectid, row.pack_id, row.site_pk_id, row.order_symb, row.scs_name, row.zone, row.easting, row.northing, row.hor_datum, row.hor_class, row.hor_order, row.target_str, row.height, row.hgt_datum, row.hgt_class, row.hgt_order, row.markstatus, row.descript, row.ist_guid, row.mb_id, row.longitude, row.latitude) });
            }
            return tass;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('tas');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom , \
            ST_X(ST_Transform(geometry,4326)) as longitude, \
           ST_Y(ST_Transform(geometry,4326)) as latitude  \
             FROM " + tablename + "    \
             ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];
        console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let tass = [];
            for (const row of rows) {
                tass.push(new Tas(row.ogc_fid, row.geom, row.objectid, row.pack_id, row.site_pk_id, row.order_symb, row.scs_name, row.zone, row.easting, row.northing, row.hor_datum, row.hor_class, row.hor_order, row.target_str, row.height, row.hgt_datum, row.hgt_class, row.hgt_order, row.markstatus, row.descript, row.ist_guid, row.mb_id, row.longitude, row.latitude));
            }
            return { x: x, y: y, markers: tass };
            //return tass;
        });
    }

}

module.exports = TasDao;