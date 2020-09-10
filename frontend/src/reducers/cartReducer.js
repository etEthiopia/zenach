import { CART_ADD_ITEM, CART_ADD_FAIL } from '../constants/cartConstants';
function cartReducer(state = { cartItems: [] }, action) {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const product = state.cartItems.find((x) => x.productId === item.productId);
			if (product) {
				return {
					cartItems: state.cartItems.map((x) => (x.productId === product.productId ? product : x))
				};
			}
			return { cartItems: [ ...state.cartItems, item ] };
		case CART_ADD_FAIL:
			return { error: action.payload };

		default:
			return state;
	}
}

export { cartReducer };
