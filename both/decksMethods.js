import { Decks, Cards } from "./collections";
import { check } from "meteor/check";

Meteor.methods({
  "decks.insert"(name, deck) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Decks.insert({
      userID: this.userId,
      name,
      deck,
    });
  },

  "decks.update"(deckId, name, deck) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Decks.update(deckId, {
      $set: {
        name,
        deck,
      },
    });
  },

  "decks.remove"(deckId) {
    check(deckId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Decks.remove(deckId);
  },
});
