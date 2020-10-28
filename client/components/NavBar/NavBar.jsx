import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Meteor } from 'meteor/meteor';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'rgba(21, 11, 1)'
  },
  loginLogoutButton: {
    position: 'absolute',
    right: 20
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button color="inherit" href='/play'>
            <Typography variant="h6" className={classes.title}>
            Play
            </Typography>
          </Button>
          {!Meteor.user() ? <Button color="inherit" href='/login' className={classes.loginLogoutButton}>Login</Button> : <Button className={classes.loginLogoutButton} color="inherit" onClick={() => Meteor.logout()} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}