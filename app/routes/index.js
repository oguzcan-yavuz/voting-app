'use strict';

const express = require('express');
let router = express.Router();

// main page router
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
