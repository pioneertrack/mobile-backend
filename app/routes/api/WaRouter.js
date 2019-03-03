'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const WaController = require('../../controllers/WaController');
const waController = new WaController();
router.get('/query', function (req, res) {
    waController.query(req, res);
});
router.get('/nearst', function (req, res) {
    waController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    waController.findById(req, res);
});
router.get('/', function (req, res) {
    waController.findByIdParam(req, res);
});

module.exports = router;