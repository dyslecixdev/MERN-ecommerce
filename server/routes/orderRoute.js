const express = require('express');

const router = express.Router();
const {
	createOrder,
	getOneOrder,
	getAllOrders,
	updateOrder,
	deleteOrder
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/:id', protect, getOneOrder);
router.get('/', protect, getAllOrders);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
