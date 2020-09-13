import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderActions';

function PlaceOrderScreen(props) {
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	if (!shipping.address) {
		props.history.push('/shipping');
	} else if (!payment.paymentMethod) {
		props.history.push('/payment');
	}

	const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = 0.15 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice
			})
		);
	};

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (success) {
				props.history.push('/order/' + order._id);
			}
		},
		[ success ]
	);

	return (
		<div>
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
									<li key={item.product}>
										<div className="cart-image">
											<img src={item.image} alt="product" />
										</div>
										<div className="cart-name">
											<div>
												<Link to={'/product/' + item.product}>{item.name}</Link>
											</div>
											<div>Quantity: {item.quantity}</div>
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
							<button
								className="button primary full-width"
								disabled={cartItems.length === 0}
								onClick={placeOrderHandler}
							>
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
				</div>
			</div>
		</div>
	);
}

export default PlaceOrderScreen;
