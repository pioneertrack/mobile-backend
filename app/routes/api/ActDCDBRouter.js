'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const ActDCDBController = require('../../controllers/ActDCDBController');
const actDCDBController = new ActDCDBController();
router.get('/query', function (req, res) {
    actDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    actDCDBController.findById(req, res);
});

module.exports = router;