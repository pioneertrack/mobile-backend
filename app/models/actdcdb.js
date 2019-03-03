'use strict';

class ActDCDB {
    constructor(ogc_fid, longitude, latitude, objectid, block_derived_area, block_leased_area, block_key, block_number, section_number, current_lifecycle_stage, addresses, plan_numbers, volume_folio, land_use_policy_zones, overlay_provision_zones, water_flag, stratum_datum_id, ground_level, stratum_lowest_level, stratum_highest_level, division_code, division_name, district_code, district_name, cuc, tp_written_statement, url, type, last_update) {
        this.ogc_fid = ogc_fid;
        this.longitude = longitude;
        this.latitude = latitude;
        this.objectid = objectid;
        this.block_derived_area = block_derived_area;
        this.block_leased_area = block_leased_area;
        this.block_key = block_key;
        this.block_number = block_number;
        this.section_number = section_number;
        this.current_lifecycle_stage = current_lifecycle_stage;
        this.addresses = addresses;
        this.plan_numbers = plan_numbers;
        this.volume_folio = volume_folio;
        this.land_use_policy_zones = land_use_policy_zones;
        this.overlay_provision_zones = overlay_provision_zones;
        this.water_flag = water_flag;
        this.stratum_datum_id = stratum_datum_id;
        this.ground_level = ground_level;
        this.stratum_lowest_level = stratum_lowest_level;
        this.stratum_highest_level = stratum_highest_level;
        this.district_code = district_code;
        this.division_code = division_code;
        this.division_name = division_name;
        this.district_name = district_name;
        this.cuc = cuc;
        this.tp_written_statement = tp_written_statement;
        this.url = url;
        this.type = type;
        this.last_update = last_update;
    }
}

module.exports = ActDCDB;