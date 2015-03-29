'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users.js'));
router.use('/products', require('./products.js'));
router.use('/matches', require('./matches.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
