import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
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
	if (!shipping) {
		props.history.push('/shipping');
	} else if (!payment) {
		props.history.push('/payment');
	}

	const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = 0.15 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const placeOrderHandler = () => {
		// create an order
	};
	const dispatch = useDispatch();

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
		return () => {
			//
		};
	}, []);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h3>Shipping</h3>
						<div>
							{cart.shipping.address}, {cart.shipping.city},
							{cart.shipping.postCode}, {cart.shipping.country}
						</div>
						<div />
					</div>
					<div>
						<h3>Payment Method</h3>
						<div>{cart.payment.paymentMethod}</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h3>Place Order</h3>

								<div>Price</div>
							</li>

							{cartItems.length === 0 ? (
								<div>Cart is Empty</div>
							) : (
								cartItems.map((item) => (
									<li key={item.productId}>
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
													onChange={(e) =>
														dispatch(addToCart(item.productId, e.target.value))}
												>
													{[ ...Array(item.stock).keys() ].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
												<button
													type="button"
													onClick={() => removeFromCartHandler(item.productId)}
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
				</div>
				<div className="placeorder-action">
					<ul>
						<li>
							<button className="button primary full-width" disabled={cartItems.length === 0}>
								Place Order
							</button>
						</li>

						<li>
							<h3>Order Summary</h3>
						</li>
						<li>
							<div>Items</div>
							<div>${itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>${shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>${taxPrice}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>${totalPrice}</div>
						</li>
					</ul>

					<h3>
						SubTotal: {cartItems.reduce((x, y) => x + y.quantity, 0)} items : $:{' '}
						{cartItems.reduce((x, y) => x + y.price * y.quantity, 0)}{' '}
					</h3>
				</div>
			</div>
		</div>
	);
}

export default PlaceOrderScreen;
