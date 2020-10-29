import React from 'react';
import { Register } from '../Login/Login'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ButtonAppBar from '../NavBar/NavBar'
import { Router, Route, Switch } from 'react-router';
import {Cards} from '../../../both/collections'
import MtgCard from '../CardComponent/Cards'
export class AppComponent extends React.Component {
  render() {
    const { cards } = this.props;
    return (
      <div>
        <MtgCard cards={this.props.cards}/>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
      cards: Cards.find().fetch(),
  };  
})(AppComponent);
