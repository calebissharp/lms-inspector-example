import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

import fileSaga from './sagas/file';

const configureStore = (initialState) => {
  const logger = createLogger({
    stateTransformer: state => state.toJS(),
  });
  
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware, logger)
  ));

  sagaMiddleware.run(fileSaga);

  return store;
};

export default configureStore;