import { Meteor } from 'meteor/meteor';
import { Cards } from '../both/collections'

Meteor.publish("Cards", function() {
  return Cards.find();
});