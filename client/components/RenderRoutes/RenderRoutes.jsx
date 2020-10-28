import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
// route components
import App from '../App/App'
import { render } from 'react-dom'
import { Register } from '../Login/Login'
import { Meteor } from 'meteor/meteor';
import {_ShowNumbers} from '../DeckBuilder/DeckBuilder'
import ButtonAppBar from '../NavBar/NavBar'
Meteor.startup(() => {
  console.log(Meteor)
  const isLoggedIn = Meteor.userId() !== null; 
  render((
    <ButtonAppBar />
  ),
  document.getElementById('root')
  );
});