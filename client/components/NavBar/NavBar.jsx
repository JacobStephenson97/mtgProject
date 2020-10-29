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
import AppComponent from '../App/App'
import DeckBuilder from '../DeckBuilder/DeckBuilder'
import Container from '@material-ui/core/Container';


function TabPanel(props) {
  const {children, value, index, classes, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Container>
                  <Box>
                      {children}
                  </Box>
              </Container>
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
  const { user } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Home" id="simple-tab-0" className={classes.tabs}/>
          <Tab label="Decks" id="simple-tab-1"  className={classes.tabs}/>
          {!user ? <Tab label="Login" color="inherit" className={classes.loginLogoutButton}  id="simple-tab-2" /> : undefined }
        </Tabs>
        {user ? <Button className={classes.LogoutButton} color="inherit" onClick={() => Meteor.logout()} >Logout</Button> : undefined}
      </AppBar>
      <TabPanel value={value} index={0}>
        <AppComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeckBuilder />
      </TabPanel>
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
