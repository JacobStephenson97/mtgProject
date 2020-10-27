import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
// route components
import App from '../App/App'
import { render } from 'react-dom'
import {Register} from '../Login/Login'
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  render((
  <BrowserRouter>
    <Route exact path="/" component={App}/>
    <Route exact path="/login">
      {!Meteor.user() ? <Redirect to='/'/> : <Register/>}
    </Route>
  </BrowserRouter>
  ),
  document.getElementById('root')
  );
});