import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    marginRight: 10,
    marginTop: 10,
    backgroundColor: 'rgba(21,11,0)',
    "&:hover": {
      backgroundColor: 'rgba(41, 11, 1)'
    }
  },
  registerButton: {
    marginRight: 10,
    marginTop: 10,
    color: 'rgba(21,11,0)',
    borderColor: 'rgba(21,11,0)',
    "&:hover": {
      backgroundColor: 'rgba(21, 11, 1)',
      borderColor: 'rgba(253, 241, 228)',
      color: 'rgba(255, 255, 255)'
    }
  },
  loginTextFields: {
    marginBottom: 10,
},
  loginContainer: {
    display: "flex",
    justifyContent: 'center',
    width: '100%',
    marginTop: 300,
    opacity: .90,
 
  },
  loginCard: {
    padding: 40,    
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
  
}));

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const inputRef = useRef('form');
  const history = useHistory();
  function handleValueChange(e, type) {
    const {
      target: { value }
    } = e;
    if (type === 'email') setEmail(value);
    else if (type === "password")  setPassword(value);
  }
  function handleRegister() {
    Accounts.createUser(
      { email: email, password: password },
      error => {
        console.log(error);
      }
    );
  }
  function handleLogin() {
    Meteor.loginWithPassword(email, password, error => {
      if (error) console.log(error);
      else history.push("/");
    });
  }
  return (
      <div className={classes.loginContainer}>
        <Card className={classes.loginCard}>
        <div >
          <img src='/mtgicon.jpg' className={classes.icon}/>
        </div> 
        <ValidatorForm
          ref={inputRef}
          onSubmit={handleLogin}
          onError={errors => console.log(errors)}
          >
        <div className="form-group">
            <TextValidator
              type="email"
              value={email}
              onChange={(e) => handleValueChange(e, 'email')}
              id="standard-basic"
              label='Email'
              aria-describedby="emailHelp"
              className={classes.loginTextFields}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'Email is not valid']}  
            />
        </div>

        <div className="form-group">
          <TextValidator
            type="password"
            label='Password'
            value={password}
            onChange={(e) => handleValueChange(e, 'password')}
            id="standard-basic"
            className={classes.loginTextFields}
            onSubmit={handleLogin}
            validators={['required']}
            errorMessages={['this field is required']} 
          />
        </div>
        <Button onClick={handleRegister} variant="outlined" color="primary" className={classes.registerButton}>
          Register
        </Button>
        <Button type="submit" variant="contained" color="primary" className={classes.loginButton} onClick={handleLogin}>
          Login
        </Button>
        </ValidatorForm>
        </Card>
      </div>
  );
};
