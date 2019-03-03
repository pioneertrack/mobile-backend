'use strict';

class Act {
    constructor(ogc_fid, geometry, objectid, type, name, construction, condition, lifecycle_stage, datum, easting, northing, hz_class, hz_order, rl_datum, reduced_level, ht_class, ht_order, mar_id, id, remarks, plans, hz_palm_order, ht_palm_order, district_name, division_name, latitude, longitude, zone, mb_id) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.type = type;
        this.name = name;
        this.construction = construction;
        this.condition = condition;
        this.lifecycle_stage = lifecycle_stage;
        this.datum = datum;
        this.easting = easting;
        this.northing = northing;
        this.hz_class = hz_class;
        this.hz_order = hz_order;
        this.rl_datum = rl_datum;
        this.reduced_level = reduced_level;
        this.ht_class = ht_class;
        this.ht_order = ht_order;
        this.mar_id = mar_id;
        this.id = id;
        this.remarks = remarks;
        this.plans = plans;
        this.hz_palm_order = hz_palm_order;
        this.ht_palm_order = ht_palm_order;
        this.division_name = division_name;
        this.district_name = district_name;
        this.mb_id = mb_id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.h_data = true;
        this.zone = zone;

        if (this.hz_palm_order == '0') {
            this.h_data = 'No';
        } else {
            this.h_data = 'Yes';
        }

        if (this.ht_palm_order == null || this.ht_palm_order == '') {
            this.v_data = 'No';
        } else {
            this.v_data = 'Yes';
        }
    }
}

module.exports = Act;