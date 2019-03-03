'use strict';

class Legal {
    constructor(gid, legal_parcel_id, state, latitude, longitude, lot, plan) {
        this.gid = gid;
        this.legal_parcel_id = legal_parcel_id;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.lot = lot;
        this.plan = plan;
    }
}
module.exports = Legal;