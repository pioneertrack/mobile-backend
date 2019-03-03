'use strict';
/* Load Task entity */

const State = require('../models/state');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class StateDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = 'SELECT * ,ST_AsGeoJSON(wkb_geometry) as geom FROM australian_states WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let states = [];
            for (const row of rows) {
                states.push(new State(row.ogc_fid, row.geom, row.st_ply_pid, row.dt_create, row.dt_retire, row.state_pid, row.state_name));
            }
            return states;
        });
    }
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = 'SELECT  *,ST_AsGeoJSON(wkb_geometry) as geom FROM australian_states order by ogc_fid desc fetch first 10 rows only';
        return this.common.findAll(sqlRequest).then(rows => {
            let states = [];
            for (const row of rows) {
                states.push(new State(row.ogc_fid, row.geom, row.st_ply_pid, row.dt_create, row.dt_retire, row.state_pid, row.state_name));
            }
            return states;
        });
    }
    findByLocation(x, y) {
        let point = 'SRID=4326;POINT(' + x + ' ' + y + ')';
        let sqlRequest = ' SELECT state_name from australian_states where ST_Within(ST_GeomFromText($1),wkb_geometry)  ';
        console.log(sqlRequest);
        console.log(point);
        let sqlParams = [point];
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            let states = '';
            if (rows.length > 0) {
                return rows[0].state_name;
            }
            return states;
        });
    }

}

module.exports = StateDao;