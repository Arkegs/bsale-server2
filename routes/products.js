const express = require('express');
const router = express.Router({ mergeParams: true });
const products = require('../controllers/products');

router.get('/', products.getAll);
router.get('/:productId', products.getOne);

module.exports = router;