import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

function productListReducer(state = { products: [] }, action) {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };

		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };

		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
}

function productDetailsReducer(state = { product: [], images: [] }, action) {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			var prod = {
				id: null,
				name: null,
				category: null,
				price: null,
				brand: null,
				rating: null,
				reveiwNo: null
			};
			prod.id = action.payload._id;
			prod.name = action.payload.name;
			prod.category = action.payload.category;
			prod.price = action.payload.price;
			prod.brand = action.payload.brand;
			prod.rating = action.payload.rating;
			prod.reveiwNo = action.payload.reveiwNo;

			return { loading: false, product: prod, images: action.payload.images };

		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
}

export { productListReducer, productDetailsReducer };
