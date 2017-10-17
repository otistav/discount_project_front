import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/page.css';
import '../styles/offers.css';
import Paper from 'material-ui/Paper';
import _ from 'lodash/collection';
import Subheader from "../components/DictSubheader";
import get from "lodash/get";
import User from '../components/User';
import {
  getAllUsers
} from '../actions/users';
import OfferDialog from '../components/OfferDialog';

class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    let users = _.map(this.props.users, user => {
      return {
        username: user.username,
        role_id: user.role_id,
        first_name: user.first_name,
        second_name: user.second_name,
        role: get(user.Role, 'role_name', null)


      }
    });
    console.log(users);

    return(
      <div>
        <Paper className="page">

          <Subheader
            subheaderName="Users"
            label="CREATE USER"
          />
          <div className="offers">
            {users.map((user) => (
              <User
                user={{
                  username: user.username,
                  role_id: user.role_id,
                  first_name: user.first_name,
                  second_name: user.second_name,
                  role: user.role

                }}

              />
            ))}
          </div>
          <OfferDialog
            label="SAVE"
          />
          <OfferDialog
            label="CREATE"
          />
        </Paper>
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    users: state.users.items
  }),
  dispatch => ({
    getAllUsers: () => {
      return dispatch(getAllUsers())
    }
  })
)(Users))