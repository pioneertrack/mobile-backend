'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const TasDCDBController = require('../../controllers/TasDCDBController');
const tasDCDBController = new TasDCDBController();
router.get('/query', function (req, res) {
    tasDCDBController.query(req, res);
});

router.get('/:id', function (req, res) {

    tasDCDBController.findById(req, res);
});

module.exports = router;