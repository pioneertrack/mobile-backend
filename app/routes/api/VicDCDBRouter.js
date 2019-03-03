'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const VicDCDBController = require('../../controllers/VicDCDBController');
const vicDCDBController = new VicDCDBController();
router.get('/query', function (req, res) {
    vicDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    vicDCDBController.findById(req, res);
});

module.exports = router;