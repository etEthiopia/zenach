const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		images: { type: Array, required: true },
		brand: { type: String, required: true },
		price: { type: Number, default: 0, required: true },
		category: { type: String, required: true },
		stock: { type: Number, default: 0, required: true },
		description: { type: String, required: true },
		rating: { type: Number, default: 0, required: true },
		reviewNo: { type: Number, default: 0, required: true }
	},
	{
		timestamps: true
	}
);

module.exports.toJSON = function(obj) {
	var obj = this.toObject();
	return obj;
};

module.exports = mongoose.model('Product', productSchema);
