const router = require('express').Router();
const Product = require('../models/product.model');
const { isAuth, isAdmin } = require('../utils');

// @Route GET api/products/
// @desc GET returns products
// @access Public
router.get('/', async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

// @Route POST api/users/products
// @desc POST Add a Product
// @access Admin
router.post('/', isAuth, isAdmin, async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		image: req.body.image,
		brand: req.body.brand,
		category: req.body.category,
		stock: req.body.countInStock,
		description: req.body.description,
		rating: req.body.rating,
		numReviews: req.body.numReviews
	});
	product
		.save()
		.then((newProduct) => {
			console.log(newProduct);
			if (newProduct) {
				res.status(201).json({ success: true, data: newProduct });
			} else {
				res.status(500).json({ message: ' Error in Creating Product.', success: false });
			}
		})
		.catch((err) => res.status(500).json({ message: err.toString(), success: false }));
});

module.exports = router;
