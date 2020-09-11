import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import { cartReducers } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems }, userSignin: { userInfo } };
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer,
	product: productDetailsReducer,
	cart: cartReducers,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer
});
const store = createStore(
	reducer,
	initialState,
	compose(
		applyMiddleware(...middleWare),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
