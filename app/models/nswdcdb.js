
'use strict';

class NswDCDB {
    constructor(ogc_fid, geometry, objectid, cadid, createdate, modifieddate, controllingauthorityoid, planoid, plannumber, planlabel, itstitlestatus, itslotid, stratumlevel, hasstratum, classsubtype, lotnumber, sectionnumber, planlotarea, planlotareaunits, startdate, enddate, lastupdate, msoid, centroidid, shapeuuid, changetype, lotidstring, processstate, urbanity, latitude, longitude) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.cadid = cadid;
        this.createdate = createdate;
        this.modifieddate = modifieddate;
        this.controllingauthorityoid = controllingauthorityoid;
        this.planoid = planoid;
        this.plannumber = plannumber;
        this.planlabel = planlabel;
        this.itstitlestatus = itstitlestatus;
        this.itslotid = itslotid;
        this.stratumlevel = stratumlevel;
        this.hasstratum = hasstratum;
        this.classsubtype = classsubtype;
        this.lotnumber = lotnumber;
        this.sectionnumber = sectionnumber;
        this.planlotarea = planlotarea;
        this.planlotareaunits = planlotareaunits;
        this.startdate = startdate;
        this.enddate = enddate;
        this.lastupdate = lastupdate;
        this.msoid = msoid;
        this.centroidid = centroidid;
        this.shapeuuid = shapeuuid;
        this.changetype = changetype;
        this.lotidstring = lotidstring;
        this.processstate = processstate;
        this.urbanity = urbanity;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
module.exports = NswDCDB;