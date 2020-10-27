import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  loginButtons: {
    marginRight: 10,
    marginTop: 10, 
  },
  loginTextFields: {
    marginBottom: 10,
  },
  loginContainer: {
    display: "flex",
    justifyContent: 'center',
    width: '100%'
  },
  loginCard: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  }
}));


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  function handleValueChange(e, type) {
    const {
      target: { value }
    } = e;
    console.log(value, name, "handle")
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
    });
  }
  return (
    
    <div className={classes.loginContainer}>
      <Card className={classes.loginCard}>
      <div >
        <h1 className={classes.title}>Login</h1>
      </div> 
      <div className="form-group">
        <TextField
          type="email"
          value={email}
          onChange={(e) => handleValueChange(e, 'email')}
          id="standard-basic"
          label='Email'
          aria-describedby="emailHelp"
          className={classes.loginTextFields}
        />
      </div>
      <div className="form-group">
        <TextField
          type="password"
          label='Password'
          value={password}
          onChange={(e) => handleValueChange(e, 'password')}
          id="standard-basic"
          className={classes.loginTextFields}
        />
      </div>
      <Button onClick={handleRegister} variant="outlined" color="primary" className={classes.loginButtons}>
        Register
      </Button>
      <Button variant="contained" color="primary" className={classes.loginButtons} onClick={handleLogin}>
        Login
      </Button>
      </Card>
    </div>
  );
};