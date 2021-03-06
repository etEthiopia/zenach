import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { logout } from './actions/userActions';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import { useSelector, useDispatch } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ManageScreen from './screens/ManageScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const dispatch = useDispatch();
	const { userInfo } = userSignin;

	const openMenu = () => {
		document.querySelector('.sidebar').classList.add('open');
	};

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};

	const logoutHandler = async () => {
		await dispatch(logout());
		window.location = '/';
	};

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						<button onClick={openMenu}>&#9776;</button>
						<Link to="/">Zenaጭ</Link>
					</div>
					<div className="header-links">
						<Link to="/cart">Cart</Link>

						{userInfo ? (
							<span class="dropdown">
								<button className="dropbtn">{userInfo.name}</button>
								<div className="dropdown-content">
									{userInfo.type === 'admin' && <Link to="/manage">Manage</Link>}
									<Link to="/">Profile</Link>
									<Link onClick={() => logoutHandler()}>Logout</Link>
								</div>
							</span>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<aside className="sidebar">
					<h3>Shopping Categories</h3>
					<button className="sidebar-close-button" onClick={closeMenu}>
						x
					</button>
					<ul>
						<li>
							<a href="index.html">Pants</a>
						</li>

						<li>
							<a href="index.html">Shirts</a>
						</li>
					</ul>
				</aside>
				<main className="main">
					<div className="content">
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/" exact={true} component={HomeScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/signin" component={SignInScreen} />
						<Route path="/manage" component={ManageScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/order/:id" component={OrderScreen} />
					</div>
				</main>
				<footer className="footer">All right reserved.</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
