'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const NswTestController = require('../../controllers/NswTestController');
const nswTestController = new NswTestController();
router.get('/query', function (req, res) {
    nswTestController.query(req, res);
});
router.get('/nearst', function (req, res) {
    nswTestController.nearst(req, res);
});
router.get('/', function (req, res) {
    nswTestController.findAll(req, res);
});

router.get('/:id', function (req, res) {

    nswTestController.findById(req, res);
});

module.exports = router;