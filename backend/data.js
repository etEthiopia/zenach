const uuid = require('uuid');

data = {
	products: [
		{
			_id: uuid.v4(),
			name: 'Man United Shirt',
			images: [
				'/images/manutd/front.jpg',
				'/images/manutd/frontleft.jpg',
				'/images/manutd/frontright.jpg',
				'/images/manutd/kidfront.jpg',
				'/images/manutd/kidside.jpg'
			],
			category: 'shirts',
			price: 70,
			brand: 'Addidas',
			rating: 4.7,
			reveiwNo: 8,
			stock: 6
		},
		{
			_id: uuid.v4(),
			name: 'Classic Grey Shirt',
			images: [
				'/images/nike/grey1.png',
				'/images/nike/grey2.png',
				'/images/nike/grey3.png',
				'/images/nike/grey4.png',
				'/images/nike/grey5.png'
			],
			category: 'shirts',
			price: 40,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10,
			stock: 10
		},
		{
			_id: uuid.v4(),
			name: 'Classic Black Shirt',
			images: [
				'/images/nike/black1.png',
				'/images/nike/black2.png',
				'/images/nike/black3.png',
				'/images/nike/black4.png'
			],
			category: 'shirts',
			price: 42,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10,
			stock: 12
		},
		{
			_id: uuid.v4(),
			name: 'Man United Shirt',
			images: [
				'/images/manutd/front.jpg',
				'/images/manutd/frontleft.jpg',
				'/images/manutd/frontright.jpg',
				'/images/manutd/kidfront.jpg',
				'/images/manutd/kidside.jpg'
			],
			category: 'shirts',
			price: 70,
			brand: 'Addidas',
			rating: 4.7,
			reveiwNo: 8,
			stock: 11
		},
		{
			_id: uuid.v4(),
			name: 'Classic Grey Shirt',
			images: [
				'/images/nike/grey1.png',
				'/images/nike/grey2.png',
				'/images/nike/grey3.png',
				'/images/nike/grey4.png',
				'/images/nike/grey5.png'
			],
			category: 'shirts',
			price: 40,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10,
			stock: 3
		},
		{
			_id: uuid.v4(),
			name: 'Classic Black Shirt',
			images: [
				'/images/nike/black1.png',
				'/images/nike/black2.png',
				'/images/nike/black3.png',
				'/images/nike/black4.png'
			],
			category: 'shirts',
			price: 42,
			brand: 'Nike',
			rating: 4.5,
			reveiwNo: 10,
			stock: 0
		}
	]
};

module.exports = data;
