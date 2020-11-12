import { Meteor } from "meteor/meteor";
import { Cards, Decks } from "../both/collections";
import mtg from "mtgsdk";
import "./loadImage.js";
import "../both/decksMethods";

const bound = Meteor.bindEnvironment((cb) => cb());
const limit = [{ limit: 20 }, { limit: 1 }];
const queryFrom = (s) => ({ name: { $regex: new RegExp(s, "i") } });
//const search = (search) =>
//  Cards.find(queryFrom(search), { sort: { multiverseid: -1 }, limit: 20 });

//Meteor.publish("cardSearch", search);
Meteor.publish("cardSearchTwo", function (cardName) {
  return Cards.find({ name: { $in: cardName } });
});
Meteor.publish("decks", function (userId) {
  return Decks.find({ userID: userId }, { name: 1 });
});

Meteor.publish("cardSearch", function (s) {
  if (s.includes("t:")) {
    console.log(
      Cards.find(
        { types: { $regex: new RegExp(s.substring(2), "i") } },
        { sort: { multiverseid: -1 }, limit: 20 },
        { limit: 2 }
      ).fetch()
    );
    Counts.publish(this, "cardSearch", Cards.find(), { fastCount: true }); //try setting this to false... eep!
    return Cards.find(
      { types: { $regex: new RegExp(s.substring(2), "i") } },
      { sort: { name: 1, multiverseid: -1 }, limit: 100 }
    );
  }

  return Cards.find(
    { name: { $regex: new RegExp(s, "i") } },
    { sort: { multiverseid: -1 }, limit: 1000 }
  );
});

const insertCard = (card) => {
  const { number = "", imageUrl = "" } = card;
  bound(() => {
    if (!(!number.includes("★") && imageUrl.includes("h"))) return;
    Cards.insert(card);
    console.log(card.name);
  });
};

const startup = () => {
  if (Cards.find().count() > 0) return;
  mtg.card.all().on("data", insertCard);
};

Meteor.startup(startup);
