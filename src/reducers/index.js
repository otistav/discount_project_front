import { combineReducers } from 'redux';
import registerForm from './registerForm';
import loginForm from './loginForm';
import statistic from './statistic';
import offers from './offers';

export default combineReducers({
  registerForm,
  loginForm,
  statistic,
  offers
})