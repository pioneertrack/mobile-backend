'use strict';

class Nt {
    constructor(ogc_fid, geometry, objectid, horizuncertainty, marktype, surveyplan, horizsurveymethod, officalfile, verticaldatum, quasi_ahd, surveyplan_link, fieldbook, adjstatus, location, extract_date, class_, geoiddeviation, verticalsurveymethod, adj_rl, vertuncertainty, verticalorder, diagram_link, mga_north, horizontaldatum, dec_long, dec_lat, verticalclass, description, zone, note1, note3, reg13certificate, note5, note7, note6, mga_east, primaryname, note2, note4, horizprojection, mb_id) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.horizuncertainty = horizuncertainty;
        this.marktype = marktype;
        this.surveyplan = surveyplan;
        this.horizsurveymethod = horizsurveymethod;
        this.officalfile = officalfile;
        this.verticaldatum = verticaldatum;
        this.quasi_ahd = quasi_ahd;
        this.surveyplan_link = surveyplan_link;
        this.fieldbook = fieldbook;
        this.adjstatus = adjstatus;
        this.location = location;
        this.extract_date = extract_date;
        this.class_ = class_;
        this.geoiddeviation = geoiddeviation;
        this.verticalsurveymethod = verticalsurveymethod;
        this.adj_rl = adj_rl;
        this.vertuncertainty = vertuncertainty;
        this.verticalorder = verticalorder;
        this.diagram_link = diagram_link;
        this.mga_north = mga_north;
        this.horizontaldatum = horizontaldatum;
        this.dec_long = dec_long;
        this.dec_lat = dec_lat;
        this.verticalclass = verticalclass;
        this.description = description;
        this.zone = zone;
        this.note1 = note1;
        this.note3 = note3;
        this.reg13certificate = reg13certificate;
        this.note5 = note5;
        this.note7 = note7;
        this.note6 = note6;
        this.mga_east = mga_east;
        this.primaryname = primaryname;
        this.note2 = note2;
        this.note4 = note4;
        this.horizprojection = horizprojection;
        this.mb_id = mb_id;
        this.v_data = 'No';
        if (this.adj_rl) {
            this.v_data = 'Yes';
        }
        this.h_data = 'No';
        if (horizsurveymethod) {
            this.h_data = 'Yes';
        }
        if (this.marktype == 'OTHER') {
            this.marktype = 'Other';
        }
    }
}

module.exports = Nt;