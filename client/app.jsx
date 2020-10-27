import React from 'react';
import { Register } from './components/login'
import { Logout } from './components/logout'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class AppComponent extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {!user   && <Register />}
        {user && <Logout />}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
      user: Meteor.user(),
  };
})(AppComponent);
