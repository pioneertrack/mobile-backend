
'use strict';

class State {
    constructor(ogc_fid, geometry, st_ply_pid, dt_create, dt_retire, state_pid, state_name) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.st_ply_pid = st_ply_pid;
        this.dt_create = dt_create;
        this.dt_retire = dt_retire;
        this.state_pid = state_pid;
        this.state_name = state_name;
    }
}
module.exports = State;