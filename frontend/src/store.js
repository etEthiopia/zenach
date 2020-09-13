import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer
} from './reducers/productReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import { cartReducers } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems }, userSignin: { userInfo } };
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer,
	product: productDetailsReducer,
	productSave: productSaveReducer,
	cart: cartReducers,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productDelete: productDeleteReducer,
	productDelete: productDeleteReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer
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
