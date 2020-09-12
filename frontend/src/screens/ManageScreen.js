import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function ManageScreen(props) {
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ id, setId ] = useState('');
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ images, setImages ] = useState([] || '');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ stock, setCountInStock ] = useState('');
	const [ description, setDescription ] = useState('');
	const productList = useSelector((state) => state.productList);
	const { loading, products = [], error } = productList;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (successSave) {
				setModalVisible(false);
			}
			dispatch(listProducts());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);

	const openModal = (product) => {
		setModalVisible(true);
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setImages(product.images);
		setBrand(product.brand);
		setCategory(product.category);
		setCountInStock(product.stock);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: id,
				name,
				price,
				images,
				brand,
				category,
				stock,
				description
			})
		);
	};
	const deleteHandler = (product) => {
		confirmAlert({
			title: 'Confirm to Delete',
			message: 'Are you sure to delete ' + product.name,
			buttons: [
				{
					label: 'Yes',
					onClick: () => dispatch(deleteProduct(product._id))
				},
				{
					label: 'No',
					onClick: () => {}
				}
			]
		});
	};
	return (
		<div className="content content-margined">
			<div className="product-header">
				{/* {!modalVisible && (
					<span> */}
				<h3> {!modalVisible && 'Products'}</h3>
				{!modalVisible && (
					<button className="button primary" onClick={() => openModal({})}>
						Create Product
					</button>
				)}
			</div>
			{modalVisible && (
				<div className="form">
					<form onSubmit={submitHandler}>
						<ul className="form-container">
							<li>
								<h2>Create Product</h2>
							</li>
							<li>
								{loadingSave && <div>Loading...</div>}
								{errorSave && <div>{errorSave}</div>}
							</li>

							<li>
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									value={name}
									id="name"
									onChange={(e) => setName(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="price">Price</label>
								<input
									type="text"
									name="price"
									value={price}
									id="price"
									onChange={(e) => setPrice(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="image">Image</label>
								<input
									type="text"
									name="image"
									value={images}
									id="image"
									onChange={(e) => {
										setImages(e.target.value.split(','));
										console.log(images);
									}}
								/>
							</li>
							<li>
								<label htmlFor="brand">Brand</label>
								<input
									type="text"
									name="brand"
									value={brand}
									id="brand"
									onChange={(e) => setBrand(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="stock">CountInStock</label>
								<input
									type="text"
									name="stock"
									value={stock}
									id="stock"
									onChange={(e) => setCountInStock(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="name">Category</label>
								<input
									type="text"
									name="category"
									value={category}
									id="category"
									onChange={(e) => setCategory(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="description">Description</label>
								<textarea
									name="description"
									value={description}
									id="description"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</li>
							<li>
								<button type="submit" className="button primary">
									{id ? 'Update' : 'Create'}
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() => setModalVisible(false)}
									className="button secondary"
								>
									Back
								</button>
							</li>
						</ul>
					</form>
				</div>
			)}
			{!modalVisible && (
				<div className="product-list">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<button className="button" onClick={() => openModal(product)}>
											Edit
										</button>{' '}
										<button className="button" onClick={() => deleteHandler(product)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
export default ManageScreen;
