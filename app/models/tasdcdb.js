'use strict';

class TasDCDB {
    constructor(ogc_fid, geometry, objectid, folio, comp_area, meas_area, pid, pot_pid, cad_type1, cad_type2, tenure_ty, feat_name, strata_lev, prop_name, cid, lpi, prop_add, prop_add1, prop_add2, prop_add3, latitude, longitude) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.folio = folio;
        this.comp_area = comp_area;
        this.meas_area = meas_area;
        this.pid = pid;
        this.pot_pid = pot_pid;
        this.cad_type1 = cad_type1;
        this.cad_type2 = cad_type2;
        this.tenure_ty = tenure_ty;
        this.feat_name = feat_name;
        this.strata_lev = strata_lev;
        this.prop_name = prop_name;
        this.cid = cid;
        this.lpi = lpi;
        this.prop_add = prop_add;
        this.prop_add1 = prop_add1;
        this.prop_add2 = prop_add2;
        this.prop_add3 = prop_add3;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
module.exports = TasDCDB;