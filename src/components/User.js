import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Img from 'react-image';
import '../styles/offers.css';

const User = props => {
  return(
    <div className="offer">
      <div className="content">
        <div>
          Username: {props.user.username}
        </div>
        <div>
          Role: {props.user.role}
        </div>
        <div>
          First Name: {props.user.first_name}
        </div>
        <div>
          Last Name: {props.user.second_name}
        </div>
      </div>
    </div>
  )
};

export default User;