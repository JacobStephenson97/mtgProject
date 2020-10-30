import { Meteor } from 'meteor/meteor';
import { Cards } from '../both/collections'
const bound = Meteor.bindEnvironment((callback) => {callback();});
const mtg = require('mtgsdk')

Meteor.publish("cardSearch", function(search) {
  return Cards.find({name: {$regex: new RegExp(search, "i") }}, {limit: 20})
});

Meteor.startup(function () {
  if (Cards.find().count() === 0) {
    mtg.card.all()
    .on('data', function (card) {
      bound(() => {
        if(!card.number.includes('★') && card.imageUrl.includes('h')) {
          Cards.insert(card)
          console.log(card.name)
      }
    });
  })
}
})
