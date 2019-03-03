'use strict';
/* Load Task entity */

const Street = require('../models/street');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class StreetDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = 'SELECT gid, gnaf_pid, legal_parcel_id,state,latitude, longitude from address_principals where gid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let streets = [];
            for (const row of rows) {
                streets.push(new Street(row.gid, row.gnaf_pid, row.legal_parcel_id, row.state, row.latitude, row.longitude));
            }
            return streets;
        });
    }
    findByLegalId(id) {
        let sqlRequest = 'SELECT gid, gnaf_pid, legal_parcel_id,state,latitude, longitude from address_principals where legal_parcel_id=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let streets = [];
            for (const row of rows) {
                streets.push(new Street(row.gid, row.gnaf_pid, row.legal_parcel_id, row.state, row.latitude, row.longitude));
            }
            return streets;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = 'select gid, gnaf_pid, legal_parcel_id,state,latitude, longitude from address_principals  order by gid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let streets = [];
            for (const row of rows) {
                streets.push(new Street(row.gid, row.gnaf_pid, row.legal_parcel_id, row.state, row.latitude, row.longitude));
            }
            return streets;
        });
    }
    findByPaging(pageNum, pageCount) {
        let countSql = 'SELECT COUNT(*) AS count FROM address_principals';
        let pagingSql = 'SELECT  gid, gnaf_pid, legal_parcel_id,state,latitude, longitude from address_principals  FROM address_principals  LIMIT ${limit} OFFSET ${offset} ';
        let sqlParams = { limit: pageCount, offset: pageNum * pageCount };
        return this.common.paging(countSql, pagingSql, sqlParams).then(data => {

            let streets = [];
            for (const row of rows) {
                streets.push(new Street(row.gid, row.gnaf_pid, row.legal_parcel_id, row.state, row.latitude, row.longitude));
            }
            return { count: data.row.count, features: streets };
        });
    }

}

module.exports = StreetDao;