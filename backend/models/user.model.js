const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, dropDups: true },
		password: { type: String, required: true },
		type: { type: String, required: true, default: 'user' }
	},
	{
		timestamps: true
	}
);

module.exports.toJSON = function(obj) {
	var obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model('User', userSchema);
