const express = require('express');
const router = express.Router({ mergeParams: true });
const categories = require('../controllers/categories');

router.get('/', categories.getAll);

module.exports = router;