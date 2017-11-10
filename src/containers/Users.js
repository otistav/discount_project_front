import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import UserDialog from '../containers/UserDialog';
import _ from 'lodash/collection';
import Subheader from "../components/DictSubheader";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Icon} from 'react-fa';
import get from "lodash/get";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import User from '../components/User';
import * as configConstants from '../constants/config';

import {
  getAllUsers,
  getRoles,
  changeModalStatus,
  editUser,
  setUser,
  setCurrentRole,
  getQueryUsers
} from '../actions/users';
import OfferDialog from './OfferDialog';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevTime: null,
      currentTime: null,
      tempValue: '',
      value: ''
    }
  }

  componentDidMount() {
    console.log(this.props.location);
    this.props.getAllUsers((this.props.match.params.id - 1) * configConstants.USERS_LIMIT_PER_PAGE);
    this.props.getRoles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id)
      this.props.getAllUsers((this.props.match.params.id - 1) * configConstants.USERS_LIMIT_PER_PAGE);
    if (this.state.value === '' && prevState.value !== this.state.value)
      this.props.getAllUsers((this.props.match.params.id - 1) * configConstants.USERS_LIMIT_PER_PAGE);

  }

  renderPagesLinks = () => {
    if (this.props.match.params.id === "1")
      return [
        <span className="navigation-link" style={{color: 'grey'}}>prev</span>,
        <Link className="navigation-link active" to={"/users/" + (Number(this.props.match.params.id) + 1)}>next</Link>];
    if (Number(this.props.match.params.id) === Math.ceil(this.props.numberOfUsers/configConstants.USERS_LIMIT_PER_PAGE))
      return [
        <Link className="navigation-link active" to={"/users/" + (Number(this.props.match.params.id) -1)}>prev</Link>,
        <span className="navigation-link" style={{color: 'grey'}}>next</span>
      ];
    return [
      <Link className="navigation-link active" to={"/users/" + (Number(this.props.match.params.id) -1)}>prev</Link>,
      <Link className="navigation-link active" to={"/users/" + (Number(this.props.match.params.id) + 1)}>next</Link>
    ]
  };

  render() {
    let users = _.map(this.props.users, user => {
      return {
        offers: user.offers,
        username: user.username,
        role_id: user.role_id,
        first_name: user.first_name,
        second_name: user.second_name,
        role: user.Role,
        id: user.uuid

      }
    });
    console.log(this.props.match.params);
    //TODO edit some classnames
    return(
      <div>
        <Paper className="page">

          <Subheader
            subheaderName="Users"
            label="CREATE USER"
            useButton={false}
          />
          <div className="page-content">
            <TextField
              value={this.state.value}
              style={{width: '60%'}}
              floatingLabelText="search users"
              onChange={
                (e) => {
                  let newValue = e.target.value;
                  this.setState({value: e.target.value, prevTime: new Date()});

                  setTimeout(() => {
                    let oldValue = this.state.value;
                    let newTime = new Date();
                    if (oldValue === newValue && newTime - this.state.prevTime > 500) {
                      this.setState({tempValue: oldValue}, () => {
                        console.log('edited')
                      });
                      if (this.state.tempValue !== '')
                        this.props.getQueryUsers(oldValue);
                    }
                  }, 500);
                  console.log(this.state.value);

                }}
            />
            <IconButton
              onClick={() => {this.setState({value: ''})}}
            >
              <FontIcon className="material-icons">backspace</FontIcon>
            </IconButton>



            <div className="offers">
              {users.map((user) => (
                <User
                  setCurrentUser={this.props.setCurrentUser}
                  changeModalStatus={this.props.changeModalStatus}
                  roles={get(this.props, 'roles', [])}
                  user={{
                    offers: user.offers,
                    username: user.username,
                    role_id: user.role_id,
                    first_name: user.first_name,
                    second_name: user.second_name,
                    role: user.role,
                    id: user.id
                  }}
                />
              ))}
            </div>

            <UserDialog
              label="SAVE"
              editUser={this.props.editUser}
              setCurrentRole={this.props.setCurrentRole}
              isModalOpen={this.props.isModalOpen}
              changeModalStatus={this.props.changeModalStatus}
            />

            <div className="page-links">
              {this.renderPagesLinks()}
            </div>


          </div>


        </Paper>
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    users: state.users.items,
    numberOfUsers: state.users.count,
    roles: state.users.roles,
    isModalOpen: state.users.isModalOpen
  }),
  dispatch => ({
    getAllUsers: (offset) => {
      return dispatch(getAllUsers(offset))
    },
    setCurrentUser: (user) => {
      dispatch(setUser(user))
    },
    getQueryUsers: (fullName) => {
      dispatch(getQueryUsers(fullName))
    },
    setCurrentRole: (role) => {
      dispatch(setCurrentRole(role))
    },
    getRoles: () => {
      return dispatch(getRoles())
    },
    changeModalStatus: () => {
      dispatch(changeModalStatus())
    },
    editUser: (user, offset) => {
      return dispatch(editUser(user, offset))
    }
  })
)(Users))
