import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'Logic/reducers';

export const history = createHistory();
const router = routerMiddleware(history);
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = (preloadedState?: any) => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk, router)
  )
);