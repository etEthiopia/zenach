const router = require('express').Router();
const Product = require('../models/product.model');
const { isAuth, isAdmin } = require('../utils');

// @Route GET api/products/
// @desc GET returns products
// @access Public
router.get('/', async (req, res) => {
	Product.find({})
		.sort({ updatedAt: -1 })
		.then((products) => res.json(products))
		.catch((err) => res.status(400).json({ message: err.toString(), success: false }));
});
// @Route GET api/products/:id
// @desc GET returns a product detail
// @access Public
router.get('/:id', async (req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			if (!product) {
				res.status(400).json({
					success: false,
					message: 'product does not exist.'
				});
			} else {
				res.json(product);
			}
		})
		.catch((err) => res.status(400).json({ message: err.toString(), success: false }));
});

// @Route POST api/users/products
// @desc POST Add a Product
// @access Admin
router.post('/', isAuth, isAdmin, async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		images: req.body.images,
		brand: req.body.brand,
		category: req.body.category,
		stock: req.body.stock,
		description: req.body.description,
		rating: req.body.rating,
		reviewNo: req.body.reviewNo
	});
	product
		.save()
		.then((newProduct) => {
			if (newProduct) {
				res.status(201).json({ success: true, data: newProduct });
			} else {
				res.status(500).json({ message: ' Error in Creating Product.', success: false });
			}
		})
		.catch((err) => res.status(500).json({ message: err.toString(), success: false }));
});

// @Route PUT api/users/products
// @desc PUT Update a Product
// @access Admin
router.put('/:id', isAuth, isAdmin, async (req, res) => {
	const productId = req.params.id;
	Product.findById(productId)
		.then((product) => {
			if (product) {
				product.name = req.body.name;
				product.price = req.body.price;
				product.images = req.body.images;
				product.brand = req.body.brand;
				product.category = req.body.category;
				product.stock = req.body.stock;
				product.description = req.body.description;
				product
					.save()
					.then((updatedProduct) => {
						if (updatedProduct) {
							return res.status(200).json({ success: true, data: updatedProduct });
						} else {
							return res.status(500).json({ message: ' Error in Updating Product.' });
						}
					})
					.catch((err) => res.status(500).json({ message: 'Error in Updating Product.', success: false }));
			} else {
				return res.status(500).json({ message: ' Error in Updating Product.' });
			}
		})
		.catch((err) => res.status(500).json({ message: err.toString(), success: false }));
});

// @Route DELETE api/users/products
// @desc DELETE Delete a Product
// @access Admin
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
	Product.findById(req.params.id)
		.then((deletedProduct) => {
			if (deletedProduct) {
				deletedProduct
					.remove()
					.then(() => res.json({ message: 'Product Deleted', success: true }))
					.catch((err) => res.status(500).json({ message: 'Error in Deletion.', success: false }));
			} else {
				res.status(500).json({ message: 'Error in Deletion.', success: false });
			}
		})
		.catch((err) => res.status(500).json({ message: 'Error in Deletion.', success: false }));
});

module.exports = router;
