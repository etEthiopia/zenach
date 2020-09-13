import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

	const removeFromCartHandler = (productId) => {
		confirmAlert({
			title: 'Confirm to Delete',
			message: 'Are you sure to delete this Item?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => dispatch(removeFromCart(productId))
				},
				{
					label: 'No',
					onClick: () => {}
				}
			]
		});
	};

	const checkoutHandler = () => {
		props.history.push('/signin?redirect=shipping');
	};

	return error ? (
		<div>{error}</div>
	) : (
		<div className="cart">
			<div className="cart-list">
				<ul className="cart-list-container">
					<li>
						<h3>Shopping Cart</h3>

						<div>Price</div>
					</li>

					{cartItems.length === 0 ? (
						<div>Cart is Empty</div>
					) : (
						cartItems.map((item) => (
							<li key={item.product}>
								<div className="cart-image">
									<img src={item.image} alt="product" />
								</div>
								<div className="cart-name">
									<div>
										<Link to={'/product/' + item.product}>{item.name}</Link>
									</div>
									<div>
										Quantity:
										<select
											value={item.quantity}
											onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
										>
											{[ ...Array(item.stock).keys() ].map(
												(x) =>
													item.quantity === x + 1 ? (
														<option key={x + 1} selected value={x + 1}>
															{x + 1}
														</option>
													) : (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													)
											)}
										</select>
										<button
											type="button"
											onClick={() => removeFromCartHandler(item.product)}
											className="button"
										>
											Delete
										</button>
									</div>
								</div>
								<div className="cart-price">${item.price}</div>
							</li>
						))
					)}
				</ul>
			</div>
			<div className="cart-action">
				<h3>
					SubTotal: {cartItems.reduce((a, c) => a + c.quantity * 1, 0)} items : $:{' '}
					{cartItems.reduce((x, y) => x + y.price * y.quantity, 0)}{' '}
				</h3>
				<button
					className="button primary full-width"
					onClick={() => checkoutHandler()}
					disabled={cartItems.length === 0}
				>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}

export default CartScreen;
