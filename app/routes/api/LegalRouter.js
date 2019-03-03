'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const LegalController = require('../../controllers/LegalController');
const legalController = new LegalController();
router.get('/query', function (req, res) {
    legalController.query(req, res);
});

router.get('/:id', function (req, res) {

    legalController.findById(req, res);
});

module.exports = router;