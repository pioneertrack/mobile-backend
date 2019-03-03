'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const StreetController = require('../../controllers/StreetController');
const streetController = new StreetController();
router.get('/query', function (req, res) {
    streetController.query(req, res);
});
router.get('/nearst', function (req, res) {
    streetController.nearst(req, res);
});
router.get('/', function (req, res) {
    streetController.findAll(req, res);
});

router.get('/:id', function (req, res) {

    streetController.findById(req, res);
});

module.exports = router;