'use strict';
/* Load Task entity */

const Nsw = require('../models/nsw');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');
const database = require('../config/dbconfig');

/**
 * Task Data Access Object
 */
class NswDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        let tablename = database.getTableNames('nsw');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM " + tablename + " WHERE marknumber=${id} ";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType));
            }
            return nsws;
        });
    }
    findByIdAndType(id, type) {
        let tablename = database.getTableNames('nsw');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM " + tablename + " WHERE marknumber=${id} and marktype=${type}";
        let sqlParams = { id: id, type: type };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType));
            }
            return nsws;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('nsw');
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude  FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType));
            }
            return nsws;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('nsw');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom, \
        ST_X(ST_Transform(geometry,4326)) as longitude, \
       ST_Y(ST_Transform(geometry,4326)) as latitude FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let nsws = [];
            for (const row of data.rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType));
            }
            return { count: data.row.count, features: nsws };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('nsw');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(ST_Transform(geometry,4326)) as geom,  ST_X(ST_Transform(geometry,4326)) as longitude, \
        ST_Y(ST_Transform(geometry,4326)) as latitude,st_distance(geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM ' + tablename + '    \
         ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2';

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push({ distance: row.d, feature: new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType) });
            }
            return nsws;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('nsw');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';
        let sqlRequest = 'SELECT *, ST_X(ST_Transform(geometry,4326)) as longitude, \
        ST_Y(ST_Transform(geometry,4326)) as latitude  \
         FROM ' + tablename + '    \
         ORDER BY geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2';

        let sqlParams = [point, n];
        console.log(sqlRequest);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            console.log(rows);
            for (const row of rows) {

                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon, row.latitude, row.longitude, row.mb_id, row.fullMarkType));
            }
            return { x: x, y: y, markers: nsws };
            //return nsws;
        });
    }

}

module.exports = NswDao;