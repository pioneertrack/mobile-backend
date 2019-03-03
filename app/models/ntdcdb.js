'use strict';

class NtDCDB {
    constructor(ogc_fid, longitude, latitude, create_date, tenure_folio, street_name, ilis_link, parcel_type, ucv_per_m2, part, unit_count, ucv_date, owner_category, tenure_reference_description, parcel_area_m2, location_name, street_number, laiskey, tenure_status, street_number_part, location_code, tenure_reference_type, survey_plan_link, street_number_prefix, lto_code, tenure_reference_number, parcel, town_planning_zone, status_code, date_extracted, suburb, tenure_volume_type, property_name, ufi, parcel_label, survey_plan_number, admin_norm, tenure_volume, pfi, street_type, survey_id, ucv_amount) {
        this.ogc_fid = ogc_fid;
        this.longitude = longitude;
        this.latitude = latitude;
        this.create_date = create_date;
        this.tenure_folio = tenure_folio;
        this.street_name = street_name;
        this.ilis_link = ilis_link;
        this.parcel_type = parcel_type;
        this.ucv_per_m2 = ucv_per_m2;
        this.part = part;
        this.unit_count = unit_count;
        this.ucv_date = ucv_date;
        this.owner_category = owner_category;
        this.tenure_reference_description = tenure_reference_description;
        this.parcel_area_m2 = parcel_area_m2;
        this.location_name = location_name;
        this.street_number = street_number;
        this.laiskey = laiskey;
        this.tenure_status = tenure_status;
        this.street_number_part = street_number_part;
        this.location_code = location_code;
        this.tenure_reference_type = tenure_reference_type;
        this.survey_plan_link = survey_plan_link;
        this.street_number_prefix = street_number_prefix;
        this.lto_code = lto_code;
        this.tenure_reference_number = tenure_reference_number;
        this.parcel = parcel;
        this.town_planning_zone = town_planning_zone;
        this.status_code = status_code;
        this.date_extracted = date_extracted;
        this.suburb = suburb;
        this.tenure_volume_type = tenure_volume_type;
        this.property_name = property_name;
        this.ufi = ufi;
        this.parcel_label = parcel_label;
        this.survey_plan_number = survey_plan_number;
        this.admin_norm = admin_norm;
        this.tenure_volume = tenure_volume;
        this.pfi = pfi;
        this.street_type = street_type;
        this.survey_id = survey_id;
        this.ucv_amount = ucv_amount;
    }
}

module.exports = NtDCDB;