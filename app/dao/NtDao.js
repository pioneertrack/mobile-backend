'use strict';
/* Load Task entity */

const Nt = require('../models/nt');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class NtDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('nt');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(wkb_geometry) as geom FROM " + tablename + " WHERE PRIMARYNAME=${id}";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nts = [];
            for (const row of rows) {
                nts.push(new Nt(row.rogc_fid, row.geom, row.objectid, row.horizuncertainty, row.marktype, row.surveyplan, row.horizsurveymethod, row.officalfile, row.verticaldatum, row.quasi_ahd, row.surveyplan_link, row.fieldbook, row.adjstatus, row.location, row.extract_date, row.class, row.geoiddeviation, row.verticalsurveymethod, row.adj_rl, row.vertuncertainty, row.erticalorder, row.diagram_link, row.mga_north, row.horizontaldatum, row.dec_long, row.dec_lat, row.verticalclass, row.description, row.zone, row.note1, row.note3, row.reg13certificate, row.note5, row.note7, row.note6, row.mga_east, row.primaryname, row.note2, row.note4, row.horizprojection, row.mb_id));
            }
            return nts;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('nt');
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let nts = [];
            for (const row of rows) {
                nts.push(new Nt(row.rogc_fid, row.geom, row.objectid, row.horizuncertainty, row.marktype, row.surveyplan, row.horizsurveymethod, row.officalfile, row.verticaldatum, row.quasi_ahd, row.surveyplan_link, row.fieldbook, row.adjstatus, row.location, row.extract_date, row.class, row.geoiddeviation, row.verticalsurveymethod, row.adj_rl, row.vertuncertainty, row.erticalorder, row.diagram_link, row.mga_north, row.horizontaldatum, row.dec_long, row.dec_lat, row.verticalclass, row.description, row.zone, row.note1, row.note3, row.reg13certificate, row.note5, row.note7, row.note6, row.mga_east, row.primaryname, row.note2, row.note4, row.horizprojection, row.mb_id));
            }
            return nts;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('nt');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom   FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let nts = [];
            for (const row of data.rows) {
                nts.push(new Nt(row.rogc_fid, row.geom, row.objectid, row.horizuncertainty, row.marktype, row.surveyplan, row.horizsurveymethod, row.officalfile, row.verticaldatum, row.quasi_ahd, row.surveyplan_link, row.fieldbook, row.adjstatus, row.location, row.extract_date, row.class, row.geoiddeviation, row.verticalsurveymethod, row.adj_rl, row.vertuncertainty, row.erticalorder, row.diagram_link, row.mga_north, row.horizontaldatum, row.dec_long, row.dec_lat, row.verticalclass, row.description, row.zone, row.note1, row.note3, row.reg13certificate, row.note5, row.note7, row.note6, row.mga_east, row.primaryname, row.note2, row.note4, row.horizprojection, row.mb_id));
            }
            return { count: data.row.count, features: nts };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('nt');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";
        console.log(sqlRequest);
        console.log(point);
        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nts = [];
            for (const row of rows) {
                nts.push({ distance: row.d, feature: new Nt(row.rogc_fid, row.geom, row.objectid, row.horizuncertainty, row.marktype, row.surveyplan, row.horizsurveymethod, row.officalfile, row.verticaldatum, row.quasi_ahd, row.surveyplan_link, row.fieldbook, row.adjstatus, row.location, row.extract_date, row.class, row.geoiddeviation, row.verticalsurveymethod, row.adj_rl, row.vertuncertainty, row.erticalorder, row.diagram_link, row.mga_north, row.horizontaldatum, row.dec_long, row.dec_lat, row.verticalclass, row.description, row.zone, row.note1, row.note3, row.reg13certificate, row.note5, row.note7, row.note6, row.mga_east, row.primaryname, row.note2, row.note4, row.horizprojection, row.mb_id) });
            }
            return nts;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('nt');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom , \
        ST_X(ST_Transform(wkb_geometry,4326)) as longitude, \
        ST_Y(ST_Transform(wkb_geometry,4326)) as latitude  \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";
        console.log(sqlRequest);
        console.log(point);
        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nts = [];
            for (const row of rows) {
                nts.push(new Nt(row.rogc_fid, row.geom, row.objectid, row.horizuncertainty, row.marktype, row.surveyplan, row.horizsurveymethod, row.officalfile, row.verticaldatum, row.quasi_ahd, row.surveyplan_link, row.fieldbook, row.adjstatus, row.location, row.extract_date, row.class, row.geoiddeviation, row.verticalsurveymethod, row.adj_rl, row.vertuncertainty, row.erticalorder, row.diagram_link, row.mga_north, row.horizontaldatum, row.dec_long, row.dec_lat, row.verticalclass, row.description, row.zone, row.note1, row.note3, row.reg13certificate, row.note5, row.note7, row.note6, row.mga_east, row.primaryname, row.note2, row.note4, row.horizprojection, row.mb_id));
            }
            return { x: x, y: y, markers: nts };
            //return nts;
        });
    }

}

module.exports = NtDao;