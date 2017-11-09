import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

import get from 'lodash/get';
import '../styles/offers.css';

class User extends Component{
  constructor(props) {
    super(props);
    this.state = {
      role_id: this.props.user.role_id
    }
  }
  render() {

    return(
      <div className="offer">
        <div className="content">
          <div>
            Username: {this.props.user.username}
          </div>
          <div>
            Role: {
          get(this.props.user.role, 'role_name')
            ?
            get(this.props.user.role, 'role_name')
            :
            <div style={{color: '#FF1313', display: 'inline'}}>
              not specified
            </div>
        }
          </div>
          <div>
            First Name: {
            this.props.user.first_name
              ?
              this.props.user.first_name
              :
              <div style={{color: '#FF1313', display: 'inline'}}>
                not specified
              </div>
        }
          </div>
          <div>
            Last Name: {
          this.props.user.second_name
            ?
            this.props.user.second_name
            :
            <div style={{color: '#FF1313', display: 'inline'}}>
              not specified
            </div>
        }
          </div>
        </div>
        <div className="edit-button">
          <FlatButton
            style={{color: '#8BB78B'}}
            onClick={() => {this.props.changeModalStatus(); this.props.setCurrentUser(this.props.user)}}
            label="SHOW INFO"
          />
        </div>
      </div>
    )
  }
}

export default User;