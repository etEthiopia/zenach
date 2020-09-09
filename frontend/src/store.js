import { createStore, combineReducers } from 'redux';

const initialState = {};
const reducer = combineReducers({
	productsList: productListReducer
});
const store = createStore(reducer, initialState);
