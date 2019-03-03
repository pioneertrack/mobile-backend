'use strict';
/* Load Modules */

const express = require('express');
const router = express.Router();

const ImageController = require('../../controllers/ImageController');
const imageController = new ImageController();
router.get('/rotate/:angle', function (req, res) {
    imageController.rotate(req, res);
});

module.exports = router;