import { combineReducers } from 'redux';
import registerForm from './registerForm';
import loginForm from './loginForm';
import statistic from './statistic';
import offers from './offers';
import offerForm from './offerForm';
import users from './users';

export default combineReducers({
  registerForm,
  loginForm,
  statistic,
  offers,
  offerForm,
  users
})