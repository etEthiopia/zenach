const router = require('express').Router();
const Order = require('../models/order.model');
const { isAuth } = require('../utils');

// @Route GET api/orders/:id
// @desc GET returns an order detail
// @access User
router.get('/:id', isAuth, async (req, res) => {
	Order.findOne({ _id: req.params.id })
		.then((order) => {
			if (order) {
				res.json(order);
			} else {
				res.status(404).json({ message: 'Order Not Found.', success: false });
			}
		})
		.catch((err) => res.status(500).json({ message: err.toString(), success: false }));
});

// @Route POST api/orders/
// @desc POST adds an order
// @access User
router.post('/', isAuth, async (req, res) => {
	const newOrder = new Order({
		orderItems: req.body.orderItems,
		user: req.user._id,
		shipping: req.body.shipping,
		payment: req.body.payment,
		itemsPrice: req.body.itemsPrice,
		taxPrice: req.body.taxPrice,
		shippingPrice: req.body.shippingPrice,
		totalPrice: req.body.totalPrice
	});
	newOrder
		.save()
		.then((orderSaved) => {
			if (orderSaved) {
				res.status(201).json({ success: true, data: newOrderCreated });
			} else {
				res.status(500).json({ success: false, message: 'Order not Created' });
			}
		})
		.catch((err) => res.status(500).json({ message: err.toString(), success: false }));
});

module.exports = router;
