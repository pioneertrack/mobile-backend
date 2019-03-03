'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const ActController = require('../../controllers/ActController');
const actController = new ActController();
router.get('/query', function (req, res) {
    actController.query(req, res);
});
router.get('/nearst', function (req, res) {
    actController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    actController.findById(req, res);
});
router.get('/', function (req, res) {
    actController.findByIdParam(req, res);
});
module.exports = router;