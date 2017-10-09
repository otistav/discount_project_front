import React from 'react';
import '../styles/registration.css';
import '../styles/spinner.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
// let localStorage = require('react-localstorage');

const LoginForm = (props) => {
  return(
    <Paper className="register-form">
      <form action="">
        <div className="register-form-header">
          Sign In<br/>
        </div>
        {props.error ? <Snackbar
          open={props.error}
          message={props.error.response.data.message}
          bodyStyle={{background: 'red', opacity: '0.5'}}
          autoHideDuration={4000}
        /> : null}
        <TextField style={{marginBottom: '20px'}}
                   hintText="username"
                   onChange={
                     (e) => {
                       props.editUsername(e.target.value)
                     }
                   }
        /><br/>
        <TextField style={{marginBottom: '20px'}}
                   hintText="password"
                   type="password"
                   onChange={
                     (e) => {
                       props.editPassword(e.target.value)
                     }
                   }
        /><br/>
        {
          props.isFetching
            ?
            <div className="spinner">
              <div className="cube1"/>
              <div className="cube2"/>
            </div>
            :
            <RaisedButton
              style={{marginBottom: '20px'}}
              label="Sign In"
              secondary={true}
              buttonStyle={{backgroundColor: '#2BB8BC'}}
              onClick={
                () => {
                  props.login(props.username, props.password)
                    .then(() => {
                      props.history.replace('/')
                    })
                }
              }
            />
        }
        <br/>
      </form>
    </Paper>
  )
};


export default LoginForm;