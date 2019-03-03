'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const QldController = require('../../controllers/QldController');
const qldController = new QldController();
router.get('/query', function (req, res) {
    qldController.query(req, res);
});
router.get('/nearst', function (req, res) {
    qldController.nearst(req, res);
});

router.get('/:id', function (req, res) {

    qldController.findById(req, res);
});
router.get('/', function (req, res) {
    qldController.findByIdParam(req, res);
});

module.exports = router;