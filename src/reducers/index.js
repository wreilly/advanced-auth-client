import { combineReducers } from 'redux';

// Bit of ES6 to rename it:
// import { reducer as formReducer } from 'redux-form';
// Bit of ES6 to rename it:
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  // form: formReducer
  // Bit more ES6 cuteness
  // form: form
  form
});

export default rootReducer;
