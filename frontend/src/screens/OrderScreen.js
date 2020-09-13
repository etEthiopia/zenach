import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import { logout } from '../actions/userActions';

function OrderScreen(props) {
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const payHandler = () => {};

	useEffect(
		() => {
			if (successPay) {
				props.history.push('/');
			} else if (errorPay) {
				if (errorPay.includes('401')) {
					alert('Sorry you are UnAuthorized');
					dispatch(logout());
					window.location = '/';
				}
			} else {
				dispatch(detailsOrder(props.match.params.id));
			}

			return () => {};
		},
		[ successPay, errorPay ]
	);

	const handlePayment = (order) => {
		dispatch(payOrder(order));
	};

	return loading ? (
		<div>Loading ...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h3>Shipping</h3>
						<div>
							{order.shipping.address}, {order.shipping.city},
							{order.shipping.postalCode}, {order.shipping.country},
						</div>
						<div>{order.isDelivered ? 'Delivered at ' + order.deliveredAt : 'Not Delivered.'}</div>
					</div>
					<div>
						<h3>Payment</h3>
						<div>Payment Method: {order.payment.paymentMethod}</div>
						<div>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h3>Shopping Cart</h3>
								<div>Price</div>
							</li>
							{order.orderItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								order.orderItems.map((item) => (
									<li>
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
						<li className="placeorder-actions-payment">
							{loadingPay && <div>Finishing Payment...</div>}
							{!order.isPaid &&
								(order.payment.paymentMethod === 'paypal' ? (
									<Link
										onClick={() => {
											handlePayment(order._id);
										}}
									>
										{' '}
										<img src="/images/payment/paypal.png" />
									</Link>
								) : (
									<Link
										onClick={() => {
											handlePayment(order._id);
										}}
									>
										{' '}
										<img src="/images/payment/payoneer.png" />
									</Link>
								))}
						</li>
						<li>
							<h3>Order Summary</h3>
						</li>
						<li>
							<div>Items</div>
							<div>${order.itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>${order.shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>${order.taxPrice}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>${order.totalPrice}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default OrderScreen;
