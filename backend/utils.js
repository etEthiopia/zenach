const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			type: user.type
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '48h'
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		const onlyToken = token.slice(7, token.lenght);
		jwt.verify(onlyToken, process.env.JWTSECRET, (err, decode) => {
			if (err) {
				return res.status(401).send({
					message: 'Invalid Token',
					success: false
				});
			}
			req.user = token;
			next();
			return;
		});
	}
	return res.status(401).send({
		message: 'Token is not supplied',
		success: false
	});
};

const isAdmin = (req, res, next) => {
	if (req.user && req.user.type === 'admin') {
		return next();
	}
	return res.status(401).send({
		message: 'Admin Token is Invalid',
		success: false
	});
};

//export { getToken, isAuth, isAdmin };
module.exports = { getToken, isAuth, isAdmin };
