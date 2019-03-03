'use strict';

class Street {
    constructor(gid, gnaf_pid, legal_parcel_id, state, latitude, longitude) {
        this.gid = gid;
        this.gnaf_pid = gnaf_pid;
        this.legal_parcel_id = legal_parcel_id;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
module.exports = Street;