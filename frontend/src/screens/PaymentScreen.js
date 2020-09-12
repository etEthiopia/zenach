import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {
	const [ paymentMethod, setPaymentMethod ] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePayment({ paymentMethod }));
		props.history.push('/placeorder');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h2>Payment Method</h2>
						</li>

						<li>
							<span>
								<input
									type="radio"
									name="paymentMethod"
									id="paypal"
									value="paypal"
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<label htmlFor="paypal">Paypal</label>
							</span>
							<span>
								<input
									type="radio"
									name="paymentMethod"
									id="payoneer"
									value="payoneer"
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<label htmlFor="payoneer">Payoneer</label>
							</span>
						</li>
						<li />

						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}
export default PaymentScreen;
