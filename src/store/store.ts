import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loading from './loading';
import result from './result';

const rootReducer = combineReducers({
  loading: loading.reducer,
  result: result.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
