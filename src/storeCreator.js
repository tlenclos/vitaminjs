import {
    compose,
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import { routeReducer, syncHistory } from 'redux-simple-router';
import thunk from 'redux-thunk';
import { storeEnhancer } from './devTools';
import { auth } from './reducers';

function createRootReducer(app) {
    return combineReducers({ app, auth, routing: routeReducer });
}

// TODO take reducer directly from app descriptor
export default function storeCreator(reducer, history, initialState) {
    const router = syncHistory(history);
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, router),
        storeEnhancer
    )(createStore);

    const rootReducer = createRootReducer(reducer);

    return createStoreWithMiddleware(rootReducer, initialState);
}