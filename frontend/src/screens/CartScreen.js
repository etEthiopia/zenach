import React from 'react';
import { useEffect } from 'react';
import { addToCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';

function CartScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { cartItems, error } = cart;
	const dispatch = useDispatch();
	const productId = props.match.params.id;
	const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
		return () => {
			//
		};
	}, []);

	return <div>Cart Screen</div>;
}

export default CartScreen;
