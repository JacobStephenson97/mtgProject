import React, { useState, useEffect, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Cards } from "../../../both/collections";
import MtgCards from "./SearchComponent/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";
import DeckAreaComponent from "./DeckAreaComponent/DeckAreaComponent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import StatsPanel from "./StatsPanel/StatsPanel";
import { SearchArea } from "./SearchArea/SearchArea";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  cardsCard: {
    position: "absolute",
    left: "1%",
    backgroundColor: "rgba(72,72,72,0.7)",
    width: "41%",
    height: "100%",
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
  deckArea: {
    position: "relative",
    left: "1%",
    width: "98%",
    flex: "1 0.001 auto",
    transition: "all 2s;",
  },

  deckCard: {
    backgroundColor: "rgba(72,72,72,0.7)",
    padding: 10,
    height: "95%",
    width: "99%",
    position: "absolute",
  },
  deckSortButtons: {
    position: "relative",
    left: "1%",
    display: "inline",
  },
  statsArea: {
    position: "absolute",
    display: "block",
    right: "1%",
    top: "8%",
    width: "55%",
    height: "37%",
    backgroundColor: "rgba(72,72,72,0.7)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  bigContainer: {
    position: "absolute",
    left: 10,
    top: "10%",
    width: "99%",
    height: "85%",
    display: "flex",
    flexDirection: "column",
  },
}));

function addCard(cardObject, setCurrentDeck) {
  setCurrentDeck((oldDeck) => [...oldDeck, cardObject]);
}

function removeCard(cardObject, setCurrentDeck, currentDeck) {
  let index = currentDeck
    .map(function (card) {
      return card.name;
    })
    .indexOf(cardObject.name);
  currentDeck.splice(index, 1);
  setCurrentDeck([...currentDeck]);
}

export function DeckBuilder(props) {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [toggleGraph, setToggleGraph] = useState([false]);
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [collapseSearch, setCollapseSearch] = useState(false);
  const [collapseStats, setCollapseStats] = useState(true);
  const classes = useStyles();

  function handleCollapse() {
    setCollapseSearch(!collapseSearch);
  }
  return (
    <div className={classes.bigContainer}>
      <SearchArea
        addCard={addCard}
        currentDeck={currentDeck}
        setCurrentDeck={setCurrentDeck}
        search={search}
        setSearch={setSearch}
        subscription={subscription}
        setSubscription={setSubscription}
        collapseSearch={collapseSearch}
      />

      <div className={classes.deckArea}>
        <DeckAreaComponent
          currentDeck={currentDeck}
          removeCard={removeCard}
          setCurrentDeck={setCurrentDeck}
          toggleGraph={toggleGraph}
          handleCollapse={handleCollapse}
        />
      </div>
      {!collapseStats ? (
        <Card className={classes.statsArea}>
          <StatsPanel currentDeck={currentDeck} toggleGraph={toggleGraph} />
        </Card>
      ) : null}
    </div>
  );
}
