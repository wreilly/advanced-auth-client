import { combineReducers } from 'redux';

// Bit of ES6 to rename it:
// import { reducer as formReducer } from 'redux-form';
// Bit of ES6 to rename it:
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  // form: formReducer
  // Bit more ES6 cuteness
  // form: form
  form,
  auth: authReducer,
});

export default rootReducer;
