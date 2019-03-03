'use strict';
/* Load Task entity */

const Legal = require('../models/legal');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class LegalDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = 'SELECT gid,lot,plan, legal_parcel_id,state,latitude, longitude from address_principals_lot where gid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let legals = [];
            for (const row of rows) {
                legals.push(new Legal(row.gid, row.legal_parcel_id, row.state, row.latitude, row.longitude, row.lot, row.plan));
            }
            return legals;
        });
    }
    findByLegalId(id) {
        let sqlRequest = 'SELECT gid,lot,plan, legal_parcel_id,state,latitude, longitude from address_principals_lot where legal_parcel_id=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let legals = [];
            for (const row of rows) {
                legals.push(new Legal(row.gid, row.legal_parcel_id, row.state, row.latitude, row.longitude, row.lot, row.plan));
            }
            return legals;
        });
    }
    findByLegalLotPlan(lot, plan, state) {
        let sqlRequest = 'select AVG(latitude), AVG(longitude) from legal as l left join address_principals as ad on l.gid=ad.gid where l.lot=${lot}  and l.plan=${plan}';
        let sqlParams = { lot: lot, plan: plan };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            let legals = [];
            for (const row of rows) {
                legals.push( new Legal(row.gid, row.legal_parcel_id,row.state,row.latitude,row.longitude,row.lot,row.plan)
                );
            }
            return legals;
            */
            var result = null;
            if (rows.length > 0 && rows[0].longitude != null) {
                result = { x: rows[0].longitude, y: rows[0].latitude };
            }
            console.log(result);

            return result;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = 'select gid, lot,plan, legal_parcel_id,state,latitude, longitude from address_principals_lot  order by gid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let legals = [];
            for (const row of rows) {
                legals.push(new Legal(row.gid, row.legal_parcel_id, row.state, row.latitude, row.longitude, row.lot, row.plan));
            }
            return legals;
        });
    }
    findByPaging(pageNum, pageCount) {
        let countSql = 'SELECT COUNT(*) AS count FROM address_principals';
        let pagingSql = 'SELECT  gid, lot,plan, legal_parcel_id,state,latitude, longitude from address_principals_lot  FROM address_principals  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let legals = [];
            for (const row of rows) {
                legals.push(new Legal(row.gid, row.legal_parcel_id, row.state, row.latitude, row.longitude, row.lot, row.plan));
            }
            return { count: data.row.count, features: legals };
        });
    }

}

module.exports = LegalDao;