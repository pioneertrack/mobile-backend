'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const VicController = require('../../controllers/VicController');
const vicController = new VicController();
router.get('/query', function (req, res) {
    vicController.query(req, res);
});
router.get('/nearst', function (req, res) {
    vicController.nearst(req, res);
});

router.get('/:id', function (req, res) {
    vicController.findById(req, res);
});
router.get('/', function (req, res) {
    vicController.findByIdParam(req, res);
});

module.exports = router;