
'use strict';

class VicDCDB {

    constructor(ogc_fid, geometry, parcel_pfi, parcel_spi, pc_spic, pc_dtype, pc_lgac, pc_planno, pc_lotno, parc_acclt, pc_all, parcel_sec, pc_blk, pc_port, pc_sub, pc_crstat, pc_parc, pc_townc, pc_pnum, pc_fdesc, pc_part, pc_crefno, pc_stat, pc_pfi_cr, parcel_ufi, pc_ufi_cr, pc_ufi_ol, parv_pfi, pv_cnt_pfi, zlevel, pv_pfi_cr, parv_ufi, pv_ufi_cr, pv_ufi_old, latitude, longitude) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.parcel_pfi = parcel_pfi;
        this.parcel_spi = parcel_spi;
        this.pc_spic = pc_spic;
        this.pc_dtype = pc_dtype;
        this.pc_lgac = pc_lgac;
        this.pc_planno = pc_planno;
        this.pc_lotno = pc_lotno;
        this.parc_acclt = parc_acclt;
        this.pc_all = pc_all;
        this.parcel_sec = parcel_sec;
        this.pc_blk = pc_blk;
        this.pc_port = pc_port;
        this.pc_sub = pc_sub;
        this.pc_crstat = pc_crstat;
        this.pc_parc = pc_parc;
        this.pc_townc = pc_townc;
        this.pc_pnum = pc_pnum;
        this.pc_fdesc = pc_fdesc;
        this.pc_part = pc_part;
        this.pc_crefno = pc_crefno;
        this.pc_stat = pc_stat;
        this.pc_pfi_cr = pc_pfi_cr;
        this.parcel_ufi = parcel_ufi;
        this.pc_ufi_cr = pc_ufi_cr;
        this.pc_ufi_ol = pc_ufi_ol;
        this.parv_pfi = parv_pfi;
        this.pv_cnt_pfi = pv_cnt_pfi;
        this.zlevel = zlevel;
        this.pv_pfi_cr = pv_pfi_cr;
        this.parv_ufi = parv_ufi;
        this.pv_ufi_cr = pv_ufi_cr;
        this.pv_ufi_old = pv_ufi_old;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}

module.exports = VicDCDB;