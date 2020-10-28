// const Cards = new Mongo.Collection('cards');
const mtg = require('mtgsdk')
import { Mongo } from 'meteor/mongo'
const Cards = new Mongo.Collection('Cards');

// Get all cards
const bound = Meteor.bindEnvironment((callback) => {callback();});
Meteor.startup(function () {
  if (Cards.find().count() === 0) {
    mtg.card.all()
    .on('data', function (card) {
        bound(() => {
          if (!card.number.includes('★')) {
            Cards.insert(card)
            console.log(card.name)
          }
        })
    })
  }
  }
);


// Cards.insert()
