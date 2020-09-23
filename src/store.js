import { createStore, combineReducers } from 'redux';

const configureStore = () => {
    return createStore(
        combineReducers({}),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
