'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const NswController = require('../../controllers/NswController');
const nswController = new NswController();
router.get('/query', function (req, res) {
    nswController.query(req, res);
});
router.get('/nearst', function (req, res) {
    nswController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    nswController.findById(req, res);
});
router.get('/', function (req, res) {
    nswController.findByIdParam(req, res);
});
module.exports = router;