import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducers } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer,
	product: productDetailsReducer,
	cart: cartReducers
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
