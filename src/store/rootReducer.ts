import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './states/example/exampleSlice';
import userReducer from './states/user/userSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
});

export default rootReducer;
