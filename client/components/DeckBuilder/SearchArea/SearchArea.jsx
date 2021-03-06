import React, { useState, useEffect, useRef } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Cards } from "../../../../both/collections";
import MtgCards from "../SearchComponent/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";

const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
  cardsCard: {
    position: "relative",
    left: "1%",
    backgroundColor: "rgba(72,72,72,0.7)",
    width: "41%",
    height: "15%",
    paddingLeft: 10,
    paddingRight: 4,
    marginBottom: 20,
    borderRadius: 10
  },
  searchCard: {
    backgroundColor: "rgba(72,72,72,0.7)",
    position: "relative",
    width: "41%",
    height: '75%',
    left: "1%",
    paddingLeft: 10,
    paddingRight: 4,
    marginBottom: 20,
    borderRadius: 10
  },
  inputBase: {
    borderRadius: theme.shape.borderRadius,
    height: "6vh",
    padding: theme.spacing(2),
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#C8C8C8",
  },
  searchAreaContainer: {
    height: 0,
    position: 'relative',
    marginBottom: 20,
    flex: '0 0 47%',
    transition: 'flex 1000ms ease',
    

  },
  searchAreaContainerCollapsed: {
    height: 0,
    position: 'relative',
    marginBottom: 20,
    flex: '0 0 0',
    transition: 'flex 1000ms ease',
  }
}));

function handleValueChange(e, setSearch, setSubscription) {
  setSearch(e.target.value);
}


export function SearchArea({ addCard, currentDeck, setCurrentDeck, search, setSearch, subscription, setSubscription, collapseSearch }) {
  const classes = useStyles();
  const [ focused, setFocused ] = useState(false)
  
  const { cards, isLoading } = useTracker(() => {
    const noDataAvailable = { cards: [] }
    if(!Meteor.user()) {
      return noDataAvailable
    }
    const handler = Meteor.subscribe('cardSearch', search);

    if (!handler.ready() || search == '') {
      return { noDataAvailable, isLoading: true };
    }

    const cards = Cards.find({name: {$regex: new RegExp(search, "i") }}, {limit: 20}).fetch()
    console.log(cards)
    return { cards }
  })
  return(
    
      <div className={collapseSearch ? classes.searchAreaContainer : classes.searchAreaContainerCollapsed}>
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
