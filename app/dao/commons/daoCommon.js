'use strict';
/* Load database & database configuration */

const database = require('../../config/dbconfig');

/**
 * DAOs Common functions
 */
class Common {
    findOne(sqlRequest, param) {
        return database.db.any(sqlRequest, param);
    }
    find(sqlRequest, param) {
        return database.db.any(sqlRequest, param);
    }
    findAll(sqlRequest) {
        return database.db.any(sqlRequest);
    }
    paging(countsql, pagesql, sqlParams) {
        return database.db.task(t => {
            return t.oneOrNone(countsql).then(row => {
                if (row.count > 0) {
                    return database.db.any(pagesql, sqlParams).then(rows => {
                        return { row, rows };
                    });
                }
                return { count: 0 }; // user not found, so no events
            });
        });
    }
    tableName(tableSql) {
        console.log(database.getTableNames());
        return database.db.task(t => {
            return t.oneOrNone(tableSql).then(row => {
                return { tableName: row["tbl_name"] };
            });
        });
    }
}
module.exports = Common;