
'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const NswDCDBController = require('../../controllers/NswDCDBController');
const nswDCDBController = new NswDCDBController();
router.get('/query', function (req, res) {
    nswDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    nswDCDBController.findById(req, res);
});

module.exports = router;