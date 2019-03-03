'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const SaController = require('../../controllers/SaController');
const saController = new SaController();
router.get('/query', function (req, res) {
    saController.query(req, res);
});
router.get('/nearst', function (req, res) {
    saController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    saController.findById(req, res);
});
router.get('/', function (req, res) {
    saController.findByIdParam(req, res);
});
module.exports = router;