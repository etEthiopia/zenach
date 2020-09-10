import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer,
	product: productDetailsReducer,
	cart: cartReducer
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
