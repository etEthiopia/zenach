const uuid = require('uuid');

data = {
	products: [
		{
			_id: uuid.v4(),
			name: 'Slim Shirt',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'shirts',
			price: 40,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10
		},
		{
			_id: uuid.v4(),
			name: 'Fit Shirt',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'shirts',
			price: 70,
			brand: 'Addidas',
			rating: 4.7,
			reveiwNo: 8
		},
		{
			_id: uuid.v4(),
			name: 'Classic Shirt',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'shirts',
			price: 40,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10
		},
		{
			_id: uuid.v4(),
			name: 'Sweat Pant',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'pants',
			price: 45,
			brand: 'Puma',
			rating: 4.0,
			reveiwNo: 10
		},
		{
			_id: uuid.v4(),
			name: 'Jeans',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'pants',
			price: 65,
			brand: 'Zara',
			rating: 4.0,
			reveiwNo: 10
		},
		{
			_id: uuid.v4(),
			name: 'Skinny Jeans',
			images: [
				'/images/front.jpg',
				'/images/frontleft.jpg',
				'/images/frontright.jpg',
				'/images/kidfront.jpg',
				'/images/kidside.jpg'
			],
			category: 'pants',
			price: 65,
			brand: 'Zara',
			rating: 4.0,
			reveiwNo: 10
		}
	]
};

module.exports = data;
