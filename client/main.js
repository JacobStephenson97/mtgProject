import './main.html';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
console.log(Meteor)
Meteor.startup(() => {
  render(
  <App />, document.getElementById('root')
  );
});
