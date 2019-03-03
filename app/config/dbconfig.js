'use strict';

var promise = require('bluebird');
var schedule = require('node-schedule');

var options = {
    // Initialization Options
    promiseLib: promise
};
/*
 * Database configuration
 */

var pgp = require('pg-promise')(options);
//remote  server 
//var connectionString = 'postgres://scdbuser:scdbuser1234@52.62.93.22:5432/postgis_scdb';
var connectionString = 'postgres://scdbuser:scdbuser1234@localhost:5432/postgis_scdb';
//local server 

//var connectionString = 'postgres://localhost:5432/postgis_scdb';
var db = pgp(connectionString);
var tableNames;
/* Init car and driver tables if they don't exist */
let init = function () {
    /*
    db.none('CREATE TABLE if not exists task (' +
        'id INTEGER PRIMARY KEY ,' +
        ' name TEXT,' +
        ' status TEXT,' +
        ' startTime INT' +
        ')');
        
    db.none('CREATE TABLE if not exists taskitem (' +
        'id INTEGER PRIMARY KEY ,' +
        ' taskId TEXT,' +
        ' stateName TEXT,' +
        ' dbName TEXT,' +
        ' fileName TEXT,' +
        ' fileSize TEXT,' +
        ' status TEXT,' +
        ' startTime INT,' +
        ' allcount TEXT,' +
        ' downloadCount TEXT,' +
        ' source TEXT,' +
        ' msg TEXT' +
        ')');
    db.none('CREATE TABLE if not exists users (' +
        'id INTEGER PRIMARY KEY ,' +
        ' name TEXT,' +
        ' password TEXT' +
        ')');
        */

    db.none('CREATE TABLE if not exists current (' + 'id INTEGER PRIMARY KEY ,' + ' state_name TEXT,' + ' tbl_name TEXT' + ')');
    db.any("select * from current").then(data => {
        tableNames = data;
    });
};
var getTableNames = function (name) {
    console.log(name);

    for (var row in tableNames) {

        if (tableNames[row].state_name == name) {
            return tableNames[row].tbl_name;
        }
    }
    return '';
};
var rule = new schedule.RecurrenceRule();
rule.minute = 38;
schedule.scheduleJob(rule, function () {
    db.any('select * from current').then(data => {
        tableNames = data;
        console.log(tableNames);
    });
});
module.exports = {
    init: init,
    db: db,
    getTableNames: getTableNames
};