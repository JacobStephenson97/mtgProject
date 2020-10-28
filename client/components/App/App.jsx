import React from 'react';
import { Register } from '../Login/Login'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ButtonAppBar from '../NavBar/NavBar'
import { Router, Route, Switch } from 'react-router';

class AppComponent extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <ButtonAppBar />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
      user: Meteor.user(),
  };
})(AppComponent);
