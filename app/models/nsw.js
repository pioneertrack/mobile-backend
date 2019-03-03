'use strict';

class Nsw {
    constructor(ogc_fid, geometry, objectid, marktype, marknumber, markstatus, monumenttype, markalias, trigname, trigtype, monumentlocation, mgaeasting, mganorthing, mgazone, gdadate, gdaclass, gdaorder, ahdheight, ahddate, ahdclass, ahdorder, marksymbol, msoid, ausgeoid09, mgacsf, mgacon, latitude, longitude, mb_id, fullMarkType) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        this.objectid = objectid;
        this.marktype = marktype;
        this.marknumber = marknumber;
        this.monumenttype = monumenttype;
        this.markalias = markalias;
        this.trigname = trigname;
        this.trigtype = trigtype;
        this.monumentlocation = monumentlocation;
        this.mgaeasting = mgaeasting;
        this.mganorthing = mganorthing;
        this.mgazone = mgazone;
        this.gdadate = gdadate;
        this.gdaclass = gdaclass;
        this.gdaorder = gdaorder;
        this.ahdheight = ahdheight;
        this.ahddate = ahddate;
        this.ahdclass = ahdclass;
        this.ahdorder = ahdorder;
        this.marksymbol = marksymbol;
        this.msoid = msoid;
        this.ausgeoid09 = ausgeoid09;
        this.mgacsf = mgacsf;
        this.mgacon = mgacon;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mb_id = mb_id;
        this.fullMarkType = fullMarkType;
        /*
        if( monumentlocation)
        {
            monumentlocation = monumentlocation.toUpperCase();
            if(markstatus =='G'){
                this.monumentlocation ='ground level';
            }
            else if(markstatus =='B'){
                this.monumentlocation ='building or structure';
            }
            else if(markstatus =='R'){
                this.monumentlocation ='reservoir or tank';
            }
            else if(markstatus =='O'){
                this.monumentlocation ='other structure';
            }
            else if(markstatus =='S'){
                this.monumentlocation ='silo';
            }
        }
        else{
            this.monumentlocation='null';
        }
                if(markstatus)
        {
            markstatus=markstatus.toUpperCase();
            if(markstatus =='D')
            {
                this.markstatus='destroyed';
            }
            else if(markstatus =='N')
            {
                this.markstatus='not found';
            }
            else if(markstatus =='U')
            {
                this.markstatus='uncertain';
            }
            else if(markstatus =='R')
            {
                this.markstatus='restricted access';
            }
            else if(markstatus =='S')
            {
                this.markstatus='subsidence area';
            }
        }
        else
        {
            this.markstatus='null';
        }
        if(trigtype){
            trigtype=trigtype.toUpperCase();
            if(trigtype =='S')
            {
                this.trigtype='surface mark';
            }
            else if(trigtype =='P')
            {
                this.trigtype='pillar';
            }
            else if(trigtype =='M')
            {
                this.trigtype='monument';
            }
        }
        else
        {
            this.trigtype='null';
        }
        if(marktype){
            marktype=marktype.toUpperCase();
            if(marktype =='PM')
            {
                this.marktype='permanent mark';
            }
            else if(marktype =='SS')
            {
                this.marktype='state survey mark';
            }
            else if(marktype =='TS')
            {
                this.marktype='trigonometrical station';
            }
            else if(marktype =='GB')
            {
                this.marktype='geodetic bench mark';
            }
            else if(marktype =='MM')
            {
                this.marktype='miscellaneous survey mark';
            }
            else if(marktype =='CP')
            {
                this.marktype='mapping control point';
            }
            else if(marktype =='CR')
            {
                this.marktype='cadastral reference mark';
            }
        }
        */
        if (marksymbol) {
            var lastWord = marksymbol.substr(-1).toUpperCase();
            if (lastWord == 'R') {
                this.v_data = 'Yes';
                this.h_data = 'Yes';
            } else if (lastWord == 'P') {
                this.v_data = 'No';
                this.h_data = 'Yes';
            } else if (lastWord == 'G') {
                this.v_data = 'Yes';
                this.h_data = 'No';
            } else if (lastWord == 'B') {
                this.v_data = 'Appr.';
                this.h_data = 'Appr.';
            }
        }
    }
}

module.exports = Nsw;