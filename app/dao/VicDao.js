'use strict';

const Vic = require('../models/vic');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');
const database = require('../config/dbconfig');

/**
 * Task Data Access Object
 */
class VicDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let tablename = database.getTableNames('vic');
        let sqlRequest = "SELECT * ,ST_AsGeoJSON(wkb_geometry) as geom FROM " + tablename + " WHERE nineFigureNumber=${id}";
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let vics = [];
            for (const row of rows) {
                vics.push(new Vic(row.ogc_fid, row.geom, row.ahdheight, row.ahdlevelsection, row.ahdpublisheddate, row.ahdsource, row.ahdtechnique, row.coordadjid, row.coverexists, row.derivedfromahdadjustmentbyahd, row.derivedfromjurisdictiongdaadjustment, row.easting, row.ellipsoidHeight, row.gda94measurements, row.gda94publisheddate, row.gda94source, row.gda94technique, row.gnsssuitability, row.groundtomarkOffset, row.horder, row.huncertainty, row.latitude, row.latitude_precision, row.longitude, row.longitude_precision, row.markheightadjusted, row.markPostexists, row.marktype, row.mark_id, row.name, row.ninefigurenumber, row.northing, row.posuncertainty, row.scn, row.status, row.symbol, row.vorder, row.vuncertainty, row.verticaladjid, row.verticaltechnique, row.zone, row.mb_id));
            }
            return vics;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let tablename = database.getTableNames('vic');
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM ' + tablename + ' order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let vics = [];
            for (const row of rows) {
                vics.push(new Vic(row.ogc_fid, row.geom, row.ahdheight, row.ahdlevelsection, row.ahdpublisheddate, row.ahdsource, row.ahdtechnique, row.coordadjid, row.coverexists, row.derivedfromahdadjustmentbyahd, row.derivedfromjurisdictiongdaadjustment, row.easting, row.ellipsoidHeight, row.gda94measurements, row.gda94publisheddate, row.gda94source, row.gda94technique, row.gnsssuitability, row.groundtomarkOffset, row.horder, row.huncertainty, row.latitude, row.latitude_precision, row.longitude, row.longitude_precision, row.markheightadjusted, row.markPostexists, row.marktype, row.mark_id, row.name, row.ninefigurenumber, row.northing, row.posuncertainty, row.scn, row.status, row.symbol, row.vorder, row.vuncertainty, row.verticaladjid, row.verticaltechnique, row.zone, row.mb_id));
            }
            return vics;
        });
    }
    findByPaging(pageNum, pageCount) {
        let tablename = database.getTableNames('vic');
        let countSql = 'SELECT COUNT(*) AS count FROM ' + tablename + '';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom   FROM ' + tablename + '  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let vics = [];
            for (const row of data.rows) {
                vics.push(new Vic(row.ogc_fid, row.geom, row.ahdheight, row.ahdlevelsection, row.ahdpublisheddate, row.ahdsource, row.ahdtechnique, row.coordadjid, row.coverexists, row.derivedfromahdadjustmentbyahd, row.derivedfromjurisdictiongdaadjustment, row.easting, row.ellipsoidHeight, row.gda94measurements, row.gda94publisheddate, row.gda94source, row.gda94technique, row.gnsssuitability, row.groundtomarkOffset, row.horder, row.huncertainty, row.latitude, row.latitude_precision, row.longitude, row.longitude_precision, row.markheightadjusted, row.markPostexists, row.marktype, row.mark_id, row.name, row.ninefigurenumber, row.northing, row.posuncertainty, row.scn, row.status, row.symbol, row.vorder, row.vuncertainty, row.verticaladjid, row.verticaltechnique, row.zone, row.mb_id));
            }
            return { count: data.row.count, features: vics };
        });
    }
    findByNearst(x, y, n) {
        let tablename = database.getTableNames('vic');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";
        console.log(sqlRequest);
        let sqlParams = [point, n];
        console.log(sqlParams);
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let vics = [];
            for (const row of rows) {
                vics.push({ distance: row.d, feature: new Vic(row.ogc_fid, row.geometry, row.ahdheight, row.ahdlevelsection, row.ahdpublisheddate, row.ahdsource, row.ahdtechnique, row.coordadjid, row.coverexists, row.derivedfromahdadjustmentbyahd, row.derivedfromjurisdictiongdaadjustment, row.easting, row.ellipsoidHeight, row.gda94measurements, row.gda94publisheddate, row.gda94source, row.gda94technique, row.gnsssuitability, row.groundtomarkOffset, row.horder, row.huncertainty, row.latitude, row.latitude_precision, row.longitude, row.longitude_precision, row.markheightadjusted, row.markPostexists, row.marktype, row.mark_id, row.name, row.ninefigurenumber, row.northing, row.posuncertainty, row.scn, row.status, row.symbol, row.vorder, row.vuncertainty, row.verticaladjid, row.verticaltechnique, row.zone, row.mb_id) });
            }
            return vics;
        });
    }
    findByNearstByLegal(x, y, n) {
        let tablename = database.getTableNames('vic');
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = " SELECT *,ST_AsGeoJSON(wkb_geometry) as geom   \
         FROM " + tablename + "    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2";
        console.log(sqlRequest);
        let sqlParams = [point, n];
        console.log(sqlParams);
        return this.common.find(sqlRequest, sqlParams).then(rows => {

            let vics = [];
            for (const row of rows) {
                vics.push(new Vic(row.ogc_fid, row.geom, row.ahdHeight, row.ahdLevelSection, row.ahdPublishedDate, row.ahdSource, row.ahdTechnique, row.coordAdjId, row.coverExists, row.derivedFromAHDAdjustmentbyAHD, row.derivedFromJurisdictionGDAAdjustment, row.easting, row.ellipsoidHeight, row.gda94Measurements, row.gda94PublishedDate, row.gda94Source, row.gda94Technique, row.gnssSuitability, row.groundToMarkOffset, row.hOrder, row.hUncertainty, row.latitude, row.latitude_precision, row.longitude, row.longitude_precision, row.markHeightAdjusted, row.markPostExists, row.markType, row.mark_id, row.name, row.nineFigureNumber, row.northing, row.posUncertainty, row.scn, row.status, row.symbol, row.vOrder, row.vUncertainty, row.verticalAdjId, row.verticalTechnique, row.zone, row.mb_id));
            }
            var r = { x: x, y: y, markers: vics };
            console.log(vics);
            return r;
        });
    }

}

module.exports = VicDao;