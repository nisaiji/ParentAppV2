import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // This will reset the entire state to initial values
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
