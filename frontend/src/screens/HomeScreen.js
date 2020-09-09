import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomeScreen(props) {
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		axios
			.get('/api/products')
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => console.log(err.response.data + ' : ' + err.response.status));
		return () => {
			//
		};
	}, []);

	return (
		<ul className="products">
			{products.map((product) => (
				<li key={product._id}>
					<div className="product">
						<Link to={'/product/' + product._id}>
							<img className="product-image" src={product.images[0]} alt="product" />
						</Link>
						<div className="product-name">
							<Link to={'/product/' + product._id}>{product.name}</Link>
						</div>
						<div className="product-brand">{product.brand}</div>
						<div className="product-price">${product.price}</div>
						<div className="product-rating">
							{product.rating} Stars ({product.reveiwNo} Reviews)
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}

export default HomeScreen;
