'use strict';
/* Load Task entity */

const Act = require('../models/act');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class ActDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('act');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM " + tablename + " WHERE name=${id}";
        console.log(sqlRequest);
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let acts = [];
            for (const row of rows) {
                acts.push(new Act(row.ogc_fid, row.geom, row.objectid, row.type, row.name, row.construction, row.condition, row.lifecycle_stage, row.datum, row.easting, row.northing, row.hz_class, row.hz_order, row.rl_datum, row.reduced_level, row.ht_class, row.ht_order, row.mar_id, row.id, row.remarks, row.plans, row.hz_palm_order, row.ht_palm_order, row.district_name, row.division_name, row.latitude, row.longitude, row.zone, row.mb_id));
            }
            return acts;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('act');
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM ' + tablename + '  order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let acts = [];
            for (const row of rows) {
                acts.push(new Act(row.ogc_fid, row.geom, row.objectid, row.type, row.name, row.construction, row.condition, row.lifecycle_stage, row.datum, row.easting, row.northing, row.hz_class, row.hz_order, row.rl_datum, row.reduced_level, row.ht_class, row.ht_order, row.mar_id, row.id, row.remarks, row.plans, row.hz_palm_order, row.ht_palm_order, row.district_name, row.division_name, row.latitude, row.longitude, row.zone, row.mb_id));
            }
            return acts;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('act');

        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename;
        let pagingSql = 'SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let acts = [];
            for (const row of data.rows) {
                acts.push(new Act(row.ogc_fid, row.geom, row.objectid, row.type, row.name, row.construction, row.condition, row.lifecycle_stage, row.datum, row.easting, row.northing, row.hz_class, row.hz_order, row.rl_datum, row.reduced_level, row.ht_class, row.ht_order, row.mar_id, row.id, row.remarks, row.plans, row.hz_palm_order, row.ht_palm_order, row.district_name, row.division_name, row.latitude, row.longitude, row.zone, row.mb_id));
            }
            return { count: data.row.count, features: acts };
        });
    }
    findByNearst(x, y, n) {
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';
        let tablename = database.getTableNames('act');
        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude, st_distance(geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  FROM " + tablename + "    \
             ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let acts = [];
            for (const row of rows) {
                acts.push({ distance: row.d, feature: new Act(row.ogc_fid, row.geom, row.objectid, row.type, row.name, row.construction, row.condition, row.lifecycle_stage, row.datum, row.easting, row.northing, row.hz_class, row.hz_order, row.rl_datum, row.reduced_level, row.ht_class, row.ht_order, row.mar_id, row.id, row.remarks, row.plans, row.hz_palm_order, row.ht_palm_order, row.district_name, row.division_name, row.latitude, row.longitude, row.zone, row.mb_id) });
            }
            return acts;
        });
    }
    findByNearstByLegal(x, y, n) {
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';
        let tablename = database.getTableNames('act');
        let sqlRequest = " SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude, st_distance(geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  FROM " + tablename + "    \
             ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";

        let sqlParams = [point, n];
        //console.log(point);
        //console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let acts = [];

            for (const row of rows) {
                acts.push(new Act(row.ogc_fid, row.geom, row.objectid, row.type, row.name, row.construction, row.condition, row.lifecycle_stage, row.datum, row.easting, row.northing, row.hz_class, row.hz_order, row.rl_datum, row.reduced_level, row.ht_class, row.ht_order, row.mar_id, row.id, row.remarks, row.plans, row.hz_palm_order, row.ht_palm_order, row.district_name, row.division_name, row.latitude, row.longitude, row.zone, row.mb_id));
            }
            return { x: x, y: y, markers: acts };
            //return acts;
        });
    }

}

module.exports = ActDao;