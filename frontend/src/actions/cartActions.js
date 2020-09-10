import axios from 'axios';
import { CART_ADD_ITEM, CART_ADD_FAIL } from '../constants/cartConstants';

const addToCart = (productId, quantity) => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/products/' + productId);
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				productId: data._id,
				name: data.name,
				image: data.images[0],
				price: data.price,
				stock: data.stock,
				quantity: quantity
			}
		});
	} catch (error) {
		dispatch({ type: CART_ADD_FAIL, payload: error.message });
	}
};

export { addToCart };
