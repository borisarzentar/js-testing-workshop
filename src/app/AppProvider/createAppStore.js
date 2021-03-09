import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appReducer';

const createAppStore = () => createStore(appReducer, applyMiddleware(thunk));

export default createAppStore;
