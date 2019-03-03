'use strict';

class Wa {
    constructor(ogc_fid, geometry, objectid, point_number, point_type, geodetic_point_name, stamped_name_on_point, latest_status_description, latest_status_date, cadastral_connection, horiz_datum, latitude_dd, longitude_dd, projection, easting, northing, zone, horizontal_circular_error, horiz_method, horiz_accuracy, vert_datum, reduced_level, vert_accuracy, vertical_method, url, render_value, filter_value, mb_id) {
        this.ogc_fid = ogc_fid;
        this.horiz_datum = horiz_datum;
        this.geometry = geometry;
        this.objectid = objectid;
        this.point_number = point_number;
        this.point_type = point_type;
        this.geodetic_point_name = geodetic_point_name;
        this.stamped_name_on_point = stamped_name_on_point;
        this.latest_status_description = latest_status_description;
        this.latest_status_date = latest_status_date;
        this.cadastral_connection = cadastral_connection;
        this.latitude_dd = latitude_dd;
        this.longitude_dd = longitude_dd;
        this.projection = projection;
        this.easting = easting;
        this.northing = northing;
        this.zone = zone;
        this.horizontal_circular_error = horizontal_circular_error;
        this.horiz_method = horiz_method;
        this.horiz_accuracy = horiz_accuracy;
        this.vert_datum = vert_datum;
        this.reduced_level = reduced_level;
        this.vert_accuracy = vert_accuracy;
        this.vertical_method = vertical_method;
        this.url = url;
        this.render_value = render_value;
        this.filter_value = filter_value;
        this.mb_id = mb_id;
        if (this.latest_status_description) {
            if (this.latest_status_description.indexOf('located') > -1) {
                this.status_short = 'Located';
                this.status_by = this.latest_status_description.replace('located', '');
            } else if (this.latest_status_description.indexOf('destroyed') > -1) {
                this.status_short = 'Destroyed';
                this.status_by = this.latest_status_description.replace('destroyed', '');
            } else if (this.latest_status_description.indexOf('not located') > -1) {
                this.status_short = 'Not located';
                this.status_by = this.latest_status_description.replace('not located', '');
            } else if (this.latest_status_description.indexOf('damaged') > -1) {
                this.status_short = 'Damaged';
                this.status_by = this.latest_status_description.replace('damaged', '');
            } else if (this.latest_status_description.indexOf('established') > -1) {
                this.status_short = 'Established';
                this.status_by = this.latest_status_description.replace('established', '');
            } else if (this.latest_status_description.indexOf('re-established') > -1) {
                this.status_short = 'Re-established';
                this.status_by = this.latest_status_description.replace('re-established', '');
            } else if (this.latest_status_description.indexOf('unknown') > -1) {
                this.status_short = 'Unknown';
                this.status_by = this.latest_status_description.replace('unknown', '');
            } else if (this.latest_status_description.indexOf('disturbed') > -1) {
                this.status_short = 'Disturbed';
                this.status_by = this.latest_status_description.replace('disturbed', '');
            } else if (this.latest_status_description.indexOf('repaired') > -1) {
                this.status_short = 'Repaired';
                this.status_by = this.latest_status_description.replace('repaired', '');
            }
        } else {
            this.status_short = 'N/A';
            this.status_by = '';
        }

        if (this.status_by) {
            this.status_by = this.status_by.replace('(', '');
            this.status_by = this.status_by.replace(')', '');
            this.status_by = this.status_by.replace(/^\s+|\s+$/g, '');
        }

        if (this.point_type) {
            if (this.point_type == 'S') {
                this.point_type = 'SSM';
            } else if (this.point_type == 'B') {
                this.point_type = 'BM';
            }
        }
    }
}

module.exports = Wa;