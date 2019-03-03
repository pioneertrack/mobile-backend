'use strict';
/* Load Task entity */

const VicDCDB = require('../models/vicdcdb');
const database = require('../config/dbconfig');
/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Task Data Access Object
 */
class VicDCDBDao {

    constructor() {
        this.common = new daoCommon();
    }
    findById(id) {
        //·let tablename=database.getTableNames('vic_dcdb');
        let tablename = 'vic_dcdb';
        let sqlRequest = 'SELECT * ,ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326))) as longitude,ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326))) as latitude  FROM ' + tablename + ' WHERE ogc_fid=${id}';
        let sqlParams = { id: id };
        return this.common.find(sqlRequest, sqlParams).then(rows => {
            var vics = [];
            for (const row of rows) {
                vics.push(new VicDCDB(row.ogc_fid, row.geometry, row.parcel_pfi, row.parcel_spi, row.pc_spic, row.pc_dtype, row.pc_lgac, row.pc_planno, row.pc_lotno, row.parc_acclt, row.pc_all, row.parcel_sec, row.pc_blk, row.pc_port, row.pc_sub, row.pc_crstat, row.pc_parc, row.pc_townc, row.pc_pnum, row.pc_fdesc, row.pc_part, row.pc_crefno, row.pc_stat, row.pc_pfi_cr, row.parcel_ufi, row.pc_ufi_cr, row.pc_ufi_ol, row.parv_pfi, row.pv_cnt_pfi, row.zlevel, row.pv_pfi_cr, row.parv_ufi, row.pv_ufi_cr, row.pv_ufi_old));
            }
            return vics;
        });
    }
    findByLegal(lot, plan) {
        let tablename = database.getTableNames('vic_dcdb');
        //let tablename='vic_dcdb';
        let sqlRequest = 'SELECT AVG(ST_X(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as longitude,AVG(ST_Y(ST_Centroid(ST_Transform(wkb_geometry,4326)))) as latitude FROM ' + tablename + ' WHERE  \
        pc_lotno=${pc_lotno} and pc_planno=${pc_planno} ';
        let sqlParams = { pc_lotno: lot, pc_planno: plan.toUpperCase() };
        //console.log(sqlParams);
        //console.log(sqlRequest);

        return this.common.find(sqlRequest, sqlParams).then(rows => {
            /*
            var vics = [];
            for (const row of rows) {
                vics.push( new VicDCDB(row.ogc_fid, row.geometry, row.parcel_pfi,row.parcel_spi,row.pc_spic,row.pc_dtype,row.pc_lgac,
                    row.pc_planno, row.pc_lotno, row.parc_acclt, row.pc_all, row.parcel_sec,
                    row.pc_blk, row.pc_port, row.pc_sub, row.pc_crstat, row.pc_parc, row.pc_townc, row.pc_pnum, row.pc_fdesc, 
                    row.pc_part, row.pc_crefno, row.pc_stat, row.pc_pfi_cr, row.parcel_ufi,row.pc_ufi_cr,row.pc_ufi_ol,
                    row.parv_pfi,row.pv_cnt_pfi,row.zlevel,row.pv_pfi_cr,row.parv_ufi,row.pv_ufi_cr,row.pv_ufi_old,row.latitude,row.longitude)
                );
            }
            return vics;
            */
            var result = null;
            console.log(rows);
            if (rows.length > 0 && rows[0].longitude != null) {
                result = { x: rows[0].longitude, y: rows[0].latitude };
            }

            return result;
        });
    }

}

module.exports = VicDCDBDao;