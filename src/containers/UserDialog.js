import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Img from 'react-image';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import get from 'lodash/get'
import map from 'lodash/map'
import '../styles/user-dialog.css'


class UserDialog extends Component{
  constructor(props) {
    super(props);

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.changeModalStatus}
      />,
      <FlatButton
        label={this.props.label}
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.editUser(this.props.currentUser, this.props.match.params.id)
        }}

      />,
    ];    //TODO исправить первый рендер меню
    return(
      <Dialog
        className="dialog"
        actions={actions}
        modal={false}
        open={this.props.isModalOpen}
        contentClassName="modal-dialog"
        autoScrollBodyContent={true}
      >
        <Tabs>
          <Tab label="info">
            <div className="user-info">
              <div className="username">
                Username: {get(this.props.currentUser, 'username')}
              </div>
              <div className="user-role">
                Role:
                <div className="dropdown">
                  <DropDownMenu
                    value={get(this.props.currentUser, 'role')}
                    onChange={(e, key, value) => {this.props.setCurrentRole(value); console.log(value, 'this is value')}}
                  >
                    {map(this.props.roles, role => (
                        <MenuItem
                          value={role}
                          primaryText={role.role_name}
                          label={role.role_name}
                        />
                      )
                    )}
                  </DropDownMenu>
                </div>

                {get(this.props.currentUser, 'role.role_name') ? this.props.currentUser.role.role_name : 'not specified'}
              </div>
              <div className="user-first-name">
                First Name: {get(this.props.currentUser, 'first_name') ? this.props.currentUser.first_name : 'not specified'}
              </div>
              <div className="user-last-name">
                Last Name: {get(this.props.currentUser, 'second_name') ? this.props.currentUser.second_name : 'not specified'}
              </div>
            </div>
          </Tab>
          <Tab label="purchases">
            <div className="purchases-info">
              {map(this.props.currentUser.offers, offer => (
                  <div className="purchase">
                    <div>offer: {offer.name}</div>
                    <div>cost: {offer.cost}</div>
                    <Img src={"http://localhost:3000/" + offer.image} style={{width: '100px', height: '100px'}}/>
                    <div>User Discount: {offer.Deal.final_discount}</div>

                  </div>

                )
              )}
            </div>

          </Tab>
        </Tabs>

      </Dialog>
    )
  }
}


export default withRouter(connect(
  state => ({
    currentUser: state.users.currentUser,
    roles: state.users.roles
  }),
  dispatch => ({

  })
)(UserDialog));