import React from 'react';
import '../styles/registration.css';
import '../styles/spinner.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const RegisterForm = (props) => {
  return(
      <Paper className="register-form">
        <form action="">
          <div className="register-form-header">
            Sign Up<br/>
          </div>
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
                label="Sign Up"
                secondary={true}
                buttonStyle={{backgroundColor: '#2BB8BC'}}
                onClick={
                  () => {
                    props.createAccount(props.username, props.password)
                      .then(() => {
                        console.log('bleat');
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


export default RegisterForm;