'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const StateController = require('../../controllers/StateController');
const stateController = new StateController();
router.get('/find', function (req, res) {

    stateController.findByLocation(req, res);
});

router.get('/:id', function (req, res) {

    stateController.findById(req, res);
});
/*
router.get('/', function (req, res) 
{
    stateController.findAll(req, res) ;
});
*/

module.exports = router;