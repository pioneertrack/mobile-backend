'use strict';
/* Load Task entity */

const Nsw = require('../models/nsw');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class NswTestDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(wkb_geometry) as geom FROM nsw_test WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon));
            }
            return nsws;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM nsw_test order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon));
            }
            return nsws;
        });
    }
    findByPaging(pageNum, pageCount) {
        let countSql = 'SELECT COUNT(*) AS count FROM nsw_test';
        let pagingSql = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom   FROM nsw_test  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let nsws = [];
            for (const row of data.rows) {
                nsws.push(new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon));
            }
            return { count: data.row.count, features: nsws };
        });
    }

    findByNearst(x, y, n) {
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';

        let sqlRequest = ' SELECT *,ST_AsGeoJSON(ST_Transform(wkb_geometry,4326)) as geom ,st_distance(wkb_geometry, ST_Transform(ST_GeomFromText($1),3857)) as d  \
         FROM nsw_test    \
         ORDER BY wkb_geometry <->ST_Transform(ST_GeomFromText($1),3857) limit $2';

        let sqlParams = [point, n];

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let nsws = [];
            for (const row of rows) {
                nsws.push({ distance: row.d, feature: new Nsw(row.ogc_fid, row.geom, row.objectid, row.marktype, row.marknumber, row.markstatus, row.monumenttype, row.markalias, row.trigname, row.trigtype, row.monumentlocation, row.mgaeasting, row.mganorthing, row.mgazone, row.gdadate, row.gdaclass, row.gdaorder, row.ahdheight, row.ahddate, row.ahdclass, row.ahdorder, row.marksymbol, row.msoid, row.ausgeoid09, row.mgacsf, row.mgacon) });
            }
            return nsws;
        });
    }

}

module.exports = NswTestDao;