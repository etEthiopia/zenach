const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const { getToken, isAdmin, isAuth } = require('../utils');

// @Route POST api/users/signin
// @desc POST Sign In a User
// @access Public
router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	// Simple Validation
	if (!email || !password) {
		res.status(400).json({
			success: false,
			message: 'All fields are not available.'
		});
	}

	await User.findOne({
		email
	})
		.then((user) => {
			if (!user) {
				res.status(400).json({
					success: false,
					message: 'user does not exist.'
				});
			} else {
				// Validate Password
				bcrypt
					.compare(password, user.password)
					.then((isMatch) => {
						if (!isMatch) {
							res.status(400).json({
								success: false,
								message: 'Invalid Credientials.'
							});
						} else {
							res.json({
								_id: user.id,
								name: user.name,
								email: user.email,
								type: user.type,
								token: getToken(user)
							});
						}
					})
					.catch((err) =>
						res.json({
							message: err.toString(),
							success: false
						})
					);
			}
		})
		.catch((err) =>
			res.json({
				message: err,
				success: false
			})
		);
});

// @Route PUT api/users/:id
// @desc PUT Edit user info
// @access User
router.put('/:id', isAuth, async (req, res) => {
	const userId = req.params.id;
	await User.findById(userId)
		.then((user) => {
			if (user) {
				user.name = req.body.name || user.name;
				user.email = req.body.email || user.email;
				user.password = req.body.password || user.password;

				user.save().then((updatedUser) => {
					res.json({
						_id: updatedUser.id,
						name: updatedUser.name,
						email: updatedUser.email,
						type: updatedUser.type,
						token: getToken(updatedUser)
					});
				});
			} else {
				res
					.status(404)
					.json({
						message: 'User not found',
						success: false
					})
					.catch((err) =>
						res.json({
							message: err,
							success: false
						})
					);
			}
		})
		.catch((err) =>
			res.json({
				message: err,
				success: false
			})
		);
});

// @Route POST api/users/register
// @desc POST Add a User
// @access Public
router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	const user = new User({
		name: name,
		email: email,
		password: password
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) throw err;
			user.password = hash;
			user
				.save()
				.then((newUser) => {
					if (newUser) {
						res.send({
							_id: newUser.id,
							name: newUser.name,
							email: newUser.email,
							isAdmin: newUser.isAdmin,
							token: getToken(newUser)
						});
					} else {
						res.status(401).send({
							message: 'Invalid User Data.',
							success: false
						});
					}
				})
				.catch((err) => {
					if (res.statusCode == 200) {
						const message = err.toString();
						const val = message.search('duplicate key');
						if (val != -1) {
							res.status(409).json({
								message: 'There is already an account by the entered email',
								success: false
							});
						}
					} else {
						res.json({
							message: err.toString(),
							success: false
						});
					}
				});
		});
	});
});

// @Route POST api/users/createadmin
// @desc POST Add an Admin
// @access Public
router.post('/createadmin', async (req, res) => {
	const admin = new User({
		name: 'Dagmawi Negussu',
		email: 'daginegussu@gmail.com',
		password: 'daginegussu',
		type: 'admin'
	});
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(admin.password, salt, (err, hash) => {
			if (err) throw err;
			admin.password = hash;
			admin
				.save()
				.then((admin) => {
					res.status(201).json(admin)['success'] = true;
				})
				.catch((err) => {
					if (res.statusCode == 200) {
						const message = err.toString();
						const val = message.search('duplicate key');
						if (val != -1) {
							res.status(409).json({
								message: 'There is already an account by the entered email',
								success: false
							});
						}
					} else {
						res.json({
							message: err.toString(),
							success: false
						});
					}
				});
		});
	});
});

module.exports = router;
