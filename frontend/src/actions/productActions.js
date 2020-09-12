import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_SAVE_REQUEST,
	PRODUCT_SAVE_SUCCESS,
	PRODUCT_SAVE_FAIL
} from '../constants/productConstants';
import axios from 'axios';

const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get('/api/listproducts');
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
	}
};

const detailsOfProduct = (productId) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
		const { data } = await axios.get('/api/listproducts/' + productId);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
	}
};

const saveProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
		const { userSignin: { userInfo } } = getState();
		console.log('USER: ' + JSON.stringify(userInfo));
		if (!product._id) {
			const { data } = await axios.post('/api/products', product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			console.log('DATA: ' + data);
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/products/' + product._id, product, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
	}
};
export { listProducts, detailsOfProduct, saveProduct };
