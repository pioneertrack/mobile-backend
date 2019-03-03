'use strict';

class Vic {

    constructor(ogc_fid, geometry, ahdHeight, ahdLevelSection, ahdPublishedDate, ahdSource, ahdTechnique, coordAdjId, coverExists, derivedFromAHDAdjustmentbyAHD, derivedFromJurisdictionGDAAdjustment, easting, ellipsoidHeight, gda94Measurements, gda94PublishedDate, gda94Source, gda94Technique, gnssSuitability, groundToMarkOffset, hOrder, hUncertainty, latitude, latitude_precision, longitude, longitude_precision, markHeightAdjusted, markPostExists, markType, mark_id, name, nineFigureNumber, northing, posUncertainty, scn, status, symbol, vOrder, vUncertainty, verticalAdjId, verticalTechnique, zone, mb_id) {
        this.ogc_fid = ogc_fid;
        this.geometry = geometry;
        if (ahdHeight) {
            this.ahdHeight = ahdHeight.replace(/^\s+|\s+$/g, '');
        }
        if (ahdLevelSection) {
            this.ahdLevelSection = ahdLevelSection.replace(/^\s+|\s+$/g, '');
        }

        this.ahdPublishedDate = ahdPublishedDate;
        if (ahdSource) {
            this.ahdSource = ahdSource.replace(/^\s+|\s+$/g, '');
        }

        this.ahdTechnique = ahdTechnique;
        this.coordAdjId = coordAdjId;
        this.coverExists = coverExists;
        this.derivedFromAHDAdjustmentbyAHD = derivedFromAHDAdjustmentbyAHD;
        this.derivedFromJurisdictionGDAAdjustment = derivedFromJurisdictionGDAAdjustment;
        this.easting = easting;
        this.ellipsoidHeight = ellipsoidHeight;
        this.gda94Measurements = gda94Measurements;
        this.gda94PublishedDate = gda94PublishedDate;
        if (gda94Source) {
            this.gda94Source = gda94Source.replace(/^\s+|\s+$/g, '');
        }
        if (gda94Technique) {
            this.gda94Technique = gda94Technique.replace(/^\s+|\s+$/g, '');
        }

        this.gnssSuitability = gnssSuitability;
        this.groundToMarkOffset = groundToMarkOffset;
        this.hOrder = hOrder;
        this.hUncertainty = hUncertainty;
        this.latitude = latitude;
        this.latitude_precision = latitude_precision;
        this.longitude = longitude;
        this.longitude_precision = longitude_precision;
        this.markHeightAdjusted = markHeightAdjusted;
        this.markPostExists = markPostExists;
        this.markType = markType;
        this.mark_id = mark_id;
        this.name = name;
        this.nineFigureNumber = nineFigureNumber;
        this.northing = northing;
        this.posUncertainty = posUncertainty;
        this.scn = scn;
        this.status = status;
        this.symbol = symbol;
        this.vOrder = vOrder;
        this.vUncertainty = vUncertainty;
        this.verticalAdjId = verticalAdjId;
        if (verticalTechnique) {
            this.verticalTechnique = verticalTechnique.replace(/^\s+|\s+$/g, '');
        }

        this.zone = zone;
        this.mb_id = mb_id;
    }

}

module.exports = Vic;