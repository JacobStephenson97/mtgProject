import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Meteor } from 'meteor/meteor';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Register from '../Login/Login'
import { withTracker } from 'meteor/react-meteor-data';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    right: 0,
    fontSize: 20
  },
  LogoutButton: {
    position: 'absolute',
    right: 20,
    color: 'rgba(220, 220, 220)',
    fontSize: 20
  },
  tabs: {
    fontSize: 20
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const ButtonAppBar = (props)=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);  
  console.log(props)
  const { user } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Home" {...a11yProps(0)} className={classes.tabs}/>
          <Tab label="Decks" {...a11yProps(1)} className={classes.tabs}/>
          {!user ? <Tab label="Login" color="inherit" className={classes.loginLogoutButton}  {...a11yProps(2)}/> : <Button className={classes.LogoutButton} color="inherit" onClick={() => Meteor.logout()} >Logout</Button>}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={2}>
        <Register />
      </TabPanel>
    </div>
  );
}

export default NavBarContainer = withTracker((props) => {
  const sub = Meteor.user();
    return {
      user: Meteor.user()
    }
})(ButtonAppBar);
