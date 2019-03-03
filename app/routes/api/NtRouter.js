'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const NtController = require('../../controllers/NtController');
const ntController = new NtController();
router.get('/query', function (req, res) {
    ntController.query(req, res);
});
router.get('/nearst', function (req, res) {
    ntController.nearst(req, res);
});

router.get('/:id', function (req, res) {
    ntController.findById(req, res);
});
router.get('/', function (req, res) {
    ntController.findByIdParam(req, res);
});

module.exports = router;