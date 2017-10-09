import { combineReducers } from 'redux';
import registerForm from './registerForm';
import loginForm from './loginForm';

export default combineReducers({
  registerForm,
  loginForm
})