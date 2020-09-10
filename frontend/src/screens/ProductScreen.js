import React from 'react';
import { Link } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOfProduct } from '../actions/productActions';

function ProductScreen(props) {
	const productDetails = useSelector((state) => state.product);
	const { product, loading, error, images } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsOfProduct(props.match.params.id));
	}, []);

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
				<div className="details-action">
					<ul>
						<li>Price: {product.price}</li>
						<li>Status: {product.status}</li>
						<li>
							Qty:{' '}
							<select>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</li>
						<li>
							<button className="button primary">Add to Cart</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default ProductScreen;
