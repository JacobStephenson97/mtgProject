import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import App from '../App/App'
import { render } from 'react-dom'
import { Register } from '../Login/Login'
import { Meteor } from 'meteor/meteor';
import {_ShowNumbers} from '../DeckBuilder/DeckBuilder'
import {ButtonAppBar} from '../App/App'
import { Cards } from '../../../both/collections'

Meteor.startup(() => {
  const isLoggedIn = Meteor.userId() !== null;
  render((
    <ButtonAppBar />
  ),
  document.getElementById('root')
  );
});
