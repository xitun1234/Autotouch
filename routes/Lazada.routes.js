const express = require('express');
const router = express.Router();
const lazadaController = require('../controllers/Lazada.controller');

router.get('/all',lazadaController.getAllData);

router.post('/addNew', lazadaController.postData);

module.exports = router;