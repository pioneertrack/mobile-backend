'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const TasController = require('../../controllers/TasController');
const tasController = new TasController();
router.get('/query', function (req, res) {
    tasController.query(req, res);
});
router.get('/nearst', function (req, res) {
    tasController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    tasController.findById(req, res);
});
router.get('/', function (req, res) {
    tasController.findByIdParam(req, res);
});

module.exports = router;