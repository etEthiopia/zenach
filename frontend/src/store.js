import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer } from './reducers/productListReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [ thunk ];

const reducer = combineReducers({
	productList: productListReducer
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
