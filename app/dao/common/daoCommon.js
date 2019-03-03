'use strict';
/* Load database & database configuration */

const database = require('../../config/dbconfig');

/* Load bluebird Promise */
const Promise = require('bluebird');

/* Load DAO Error entity */
const DaoError = require('./daoError');

/**
 * DAOs Common functions
 */
class Common {

    findAll(sqlRequest) {
        return rdb.any(sqlRequest);
    }

}

module.exports = Common;