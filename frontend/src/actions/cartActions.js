import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_ADD_FAIL, CART_REMOVE_ITEM } from '../constants/cartConstants';

const addToCart = (productId, quantity) => async (dispatch, getState) => {
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
		const { cart: { cartItems } } = getState();
		Cookie.set('cartItems', JSON.stringify(cartItems));
	} catch (error) {
		dispatch({ type: CART_ADD_FAIL, payload: error.message });
	}
};

const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });
	const { cart: { cartItems } } = getState();
	Cookie.set('cartItems', JSON.stringify(cartItems));
};
export { addToCart, removeFromCart };
