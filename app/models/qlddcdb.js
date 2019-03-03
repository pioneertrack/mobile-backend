'use strict';

class QldDCDB {
    constructor(ogc_fid, geometry, objectid, lot, plan, lotplan, seg_num, par_num, segpar, par_ind, lot_area, excl_area, lot_volume, surv_ind, tenure, prc, parish, county, lac, shire_name, feat_name, alias_name, loc, locality, parcel_typ, cover_typ, acc_code, ca_area_sqm, se_anno_cad_data, latitude, longitude) {

        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.lot = lot;
        this.plan = plan;
        this.lotplan = lotplan;
        this.seg_num = seg_num;
        this.par_num = par_num;
        this.segpar = segpar;
        this.par_ind = par_ind;
        this.lot_area = lot_area;
        this.excl_area = excl_area;
        this.lot_volume = lot_volume;
        this.surv_ind = surv_ind;
        this.tenure = tenure;
        this.prc = prc;
        this.parish = parish;
        this.county = county;
        this.lac = lac;
        this.shire_name = shire_name;
        this.feat_name = feat_name;
        this.alias_name = alias_name;
        this.loc = loc;
        this.locality = locality;
        this.parcel_typ = parcel_typ;
        this.cover_typ = cover_typ;
        this.acc_code = acc_code;
        this.ca_area_sqm = ca_area_sqm;
        this.se_anno_cad_data = se_anno_cad_data;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = QldDCDB;