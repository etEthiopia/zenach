import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer,
	product: productDetailsReducer
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
