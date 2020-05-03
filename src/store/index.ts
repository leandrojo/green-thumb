import { createStore, combineReducers } from '../common/store';

import plants from './plants';

const reducers = combineReducers({
  plants,
});

export default createStore(reducers);
