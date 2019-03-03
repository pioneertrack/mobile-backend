'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const QldDCDBController = require('../../controllers/QldDCDBController');
const qldDCDBController = new QldDCDBController();
router.get('/query', function (req, res) {
    qldDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    qldDCDBController.findById(req, res);
});

module.exports = router;