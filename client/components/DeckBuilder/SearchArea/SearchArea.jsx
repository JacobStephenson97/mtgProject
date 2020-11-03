import React, { useState, useEffect, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Cards } from "../../../../both/collections";
import MtgCards from "../SearchComponent/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";
const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
  cardsCard: {
    position: "absolute",
    left: "1%",
    backgroundColor: "rgba(72,72,72,0.7)",
    width: "41%",
    height: "6%",
    top: "8%",
    paddingLeft: 10,
    paddingRight: 4,
  },
  searchCard: {
    backgroundColor: "rgba(72,72,72,0.7)",
    position: "absolute",
    width: "41%",
    height: "30%",
    left: "1%",
    top: "15%",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 4,
  },
  inputBase: {
    borderRadius: theme.shape.borderRadius,
    height: "6vh",
    padding: theme.spacing(2),
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#C8C8C8",
  },
}));

function handleValueChange(e, setSearch, setSubscription) {
  setSearch(e.target.value);
  setSubscription(Meteor.subscribe("cardSearch", e.target.value));
}


export function SearchArea({ cards, addCard, currentDeck, setCurrentDeck, search, setSearch, subscription, setSubscription }) {
  const classes = useStyles();
  const [ focused, setFocused ] = useState(false)
  return(
      <div>
        <Card className={classes.cardsCard}>
          <InputBase
            type="search"
            value={search}
            onChange={(e) => {
              if (subscription) subscription.stop();
              handleValueChange(e, setSearch, setSubscription);
            }}
            id="outlined-full-width"
            fullWidth
            placeholder="Search Cards..."
            variant="outlined"
            className={classes.inputBase}
            autoComplete="off"
          />
        </Card>
        <Card className={classes.searchCard}>
          <MtgCards
            cards={cards}
            addCard={addCard}
            setCurrentDeck={setCurrentDeck}
            currentDeck={currentDeck}
            search={search}
          />
        </Card>
      </div>
  )
}

export default withTracker(props => {
  if (props.search != '') {
    return {
      cards: Cards.find({name: {$regex: new RegExp(props.search, "i") }}, {limit: 20}).fetch(),
    };
  }
})(SearchArea);
