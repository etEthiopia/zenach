import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ManageScreen from './screens/ManageScreen';

function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const openMenu = () => {
		document.querySelector('.sidebar').classList.add('open');
	};

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
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
						{userInfo ? <Link to="/signin">{userInfo.name}</Link> : <Link to="/signin">Sign In</Link>}
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
					</div>
				</main>
				<footer className="footer">All right reserved.</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
