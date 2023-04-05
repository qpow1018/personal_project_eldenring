import { combineReducers } from 'redux';
import appbarReducer from './appbarReducer';

const rootReducer = combineReducers({
  appbarReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;