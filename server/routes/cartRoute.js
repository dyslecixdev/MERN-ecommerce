const express = require('express');

const router = express.Router();
const {
	createCart,
	getCart,
	getAllCarts,
	updateCart,
	deleteCart
} = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

router.post('/', createCart);
router.get('/:id', protect, getCart);
router.get('/', protect, getAllCarts);
router.put('/:id', protect, updateCart);
router.delete('/:id', protect, deleteCart);

module.exports = router;
