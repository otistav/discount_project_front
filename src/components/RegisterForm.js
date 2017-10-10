import React from 'react';
import '../styles/registration.css';
import '../styles/spinner.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const RegisterForm = (props) => {
  return(
      <Paper className="register-form">
        <form action="">
          <div className="register-form-header">
            Sign Up<br/>
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
          <TextField style={{marginBottom: '20px'}}
                     hintText="first name"
                     onChange={
                       (e) => {
                         props.editFirstName(e.target.value)
                       }
                     }
          /><br/>
          <TextField style={{marginBottom: '20px'}}
                     hintText="second name"
                     onChange={
                       (e) => {
                         props.editSecondName(e.target.value)
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
                label="Sign Up"
                secondary={true}
                buttonStyle={{backgroundColor: '#2BB8BC'}}
                onClick={
                  () => {
                    props.createAccount(props.username, props.password, props.firstName, props.secondName)
                      .then(() => {
                        console.log('bleat');
                        props.history.replace('/sign-in')
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


export default RegisterForm;