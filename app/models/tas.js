'use strict';

class Tas {
    constructor(ogc_fid, geometry, objectid, pack_id, site_pk_id, order_symb, scs_name, zone, easting, northing, hor_datum, hor_class, hor_order, target_str, height, hgt_datum, hgt_class, hgt_order, markstatus, descript, list_guid, mb_id, longitude, latitude) {

        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.longitude = longitude;
        this.latitude = latitude;
        this.objectid = objectid;
        this.pack_id = pack_id;
        this.site_pk_id = site_pk_id;
        this.order_symb = order_symb;
        this.scs_name = scs_name;
        this.zone = zone;
        this.easting = easting;
        this.northing = northing;
        this.hor_datum = hor_datum;
        this.hor_class = hor_class;
        this.hor_order = hor_order;
        this.target_str = target_str;
        this.height = height;
        this.hgt_datum = hgt_datum;
        this.hgt_class = hgt_class;
        this.hgt_order = hgt_order;
        this.markstatus = markstatus;
        this.descript = descript;
        this.list_guid = list_guid;
        this.mb_id = mb_id;
    }
}

module.exports = Tas;