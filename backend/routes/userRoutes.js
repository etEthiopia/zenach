const router = require('express').Router();
const User = require('../models/user.model');

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
	await admin
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

module.exports = router;
