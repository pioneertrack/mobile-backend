'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const NtDCDBController = require('../../controllers/NtDCDBController');
const ntDCDBController = new NtDCDBController();
router.get('/query', function (req, res) {
    ntDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    ntDCDBController.findById(req, res);
});

module.exports = router;