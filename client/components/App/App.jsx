import React, { useState, useEffect, useRef } from 'react';
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
import Register from '../Login/Login'
import { useTracker } from 'meteor/react-meteor-data';
import {DeckBuilder} from '../DeckBuilder/DeckBuilder'
import Container from '@material-ui/core/Container';
import TabPanel from './TabPanel';
import useStyles from './styles';
import Scene from "../Scenes/test";
import PlayComponent from '../Play/PlayComponent'


export const ButtonAppBar = (props)=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const { user, isLoading } = useTracker(() => {
    const noDataAvailable = { decks: [] }
    if(!Meteor.user()) {
      return noDataAvailable
    }

    const user = Meteor.user();

    return { user }
  })
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabBar} TabIndicatorProps={{style: {backgroundColor: "white"}}}>
          <Tab label="Home" id="simple-tab-0" className={classes.tabs}/>
          <Tab label="Decks" id="simple-tab-1"  className={classes.tabs}/>
          <Tab label="Play" id="simple-tab-2"  className={classes.tabs}/>
          {!user ? <Tab label="Login" color="inherit" className={classes.loginLogoutButton}  id="simple-tab-3" /> : undefined }
        </Tabs>
        {user ? <Button className={classes.LogoutButton} color="inherit" onClick={() => {Meteor.logout(); setValue(2)}} >Logout</Button> : undefined}
      </AppBar>
      <TabPanel value={value} index={0}>
        <Scene />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeckBuilder />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {!user && <Register setTab={tabNumber => setValue(tabNumber)}/>}
      </TabPanel>
    </div>
  );
}
