import React from 'react';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOfProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function ProductScreen(props) {
	const [ quantity, setQuantity ] = useState(1);
	const productDetails = useSelector((state) => state.product);
	const { product, loading, error, images } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsOfProduct(props.match.params.id));
	}, []);

	const handleAddToCart = () => {
		try {
			dispatch(addToCart(props.match.params.id, quantity));
			NotificationManager.success('Item added to cart');
		} catch (e) {
			NotificationManager.error("Couldn't add Item to cart", 'Error');
		}
		//props.history.push('/cart/' + props.match.params.id + '?quantity=' + quantity);
	};

	return loading ? (
		<div>loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<div className="back-to-result">
				<Link to="/">Back to result</Link>
			</div>
			<div className="details">
				<div className="details-image">
					<AwesomeSlider cssModule={AwesomeSliderStyles}>
						{images.map((image) => <div key={image} data-src={image} />)}
					</AwesomeSlider>
				</div>
				<div className="details-info">
					<ul>
						<li>
							<h4>{product.name}</h4>
						</li>
						<li>
							{product.rating} Stars ({product.numReviews} Reviews)
						</li>
						<li>
							Price: <b>${product.price}</b>
						</li>
						<li>
							Description:
							<div>{product.description}</div>
						</li>
					</ul>
				</div>
				{product.stock > 0 ? (
					<div className="details-action">
						<ul>
							<li>Price: {product.price}</li>
							<li>
								Quantity:
								<select
									value={quantity}
									onChange={(e) => {
										setQuantity(e.target.value);
									}}
								>
									{[ ...Array(product.stock).keys() ].map((x) => (
										<option value={x + 1}>{x + 1}</option>
									))}
								</select>
							</li>
							<li>
								<button onClick={handleAddToCart} className="button primary">
									Add to Cart
								</button>
							</li>
						</ul>
					</div>
				) : (
					<div className="details-action">
						<h4>Sorry, This product is out of Stock! </h4>
					</div>
				)}
			</div>
			<NotificationContainer />
		</div>
	);
}

export default ProductScreen;
