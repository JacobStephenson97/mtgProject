import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
// route components
import App from '../App/App'
import { render } from 'react-dom'
import { Register } from '../Login/Login'
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log(Meteor)
  const isLoggedIn = Meteor.userId() !== null; 
  render((
  <BrowserRouter>
    <Route exact path="/" component={App}/>
    <Route exact path="/login">
      {isLoggedIn ? <Redirect to='/'/> : <Register />}
    </Route>
  </BrowserRouter>
  ),
  document.getElementById('root')
  );
});