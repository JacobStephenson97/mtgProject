import { Meteor } from "meteor/meteor";
import { Cards, Decks } from "../both/collections";
import mtg from "mtgsdk";
import "./loadImage.js";

const bound = Meteor.bindEnvironment((cb) => cb());
const limit = [{ limit: 20 }, { limit: 1 }];
const queryFrom = (s) => ({ name: { $regex: new RegExp(s, "i") } });
const search = (search) => Cards.find(queryFrom(search), limit[0]);

Meteor.publish("cardSearch", search);
Meteor.publish("cardSearchTwo", function (cardName) {
  return Cards.find({ name: { $in: cardName } });
});
Meteor.publish("decks", function (userId) {
  return Decks.find({ userID: userId }, { name: 1 });
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
