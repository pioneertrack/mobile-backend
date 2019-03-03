'use strict';
/**
 * Controllers Common functions
 */

class controllerCommon {

    findSuccess(res) {
        return result => {
            res.status(200); // Found
            res.json({ status: 0, data: result });
        };
    }

    existsSuccess(res) {
        return result => {
            res.status(200); // Found
            res.json({ status: 0, data: result });
        };
    }

    editSuccess(res) {
        return () => {
            res.status(201); // Updated/Deleted
            res.json({});
        };
    }
    createSuccess(res) {
        return result => {
            res.status(201); // Created
            res.json(result);
        };
    }
    serverError(res) {
        return error => {
            res.status(500);
            res.json(error);
        };
    }

    findError(res) {
        return error => {
            res.status(404); // Not found
            res.json({ status: 1, error: error });
        };
    }
}

module.exports = controllerCommon;