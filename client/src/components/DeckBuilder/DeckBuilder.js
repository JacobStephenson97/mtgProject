import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import DeckAreaComponent from "./DeckAreaComponent/DeckAreaComponent";
// import StatsPanel from "./StatsPanel/StatsPanel";
import { SearchArea } from "./SearchArea/SearchArea";
import DeckArea from "./DeckArea/DeckArea";
import CardInspect from "./CardInspect/CardInspect";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  bigContainer: {
    marginTop: '2%',
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: '88vh'
  },
  inspectContainer: {
    position: "relative",
    backgroundColor: "black",
    float: "right",
    right: "1%",
    width: "40%"
  }
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
const DeckBuilder = (props) => {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [toggleGraph, setToggleGraph] = useState([false]);
  const [subscription, setSubscription] = useState(null);
  const [collapseSearch, setCollapseSearch] = useState(true);
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
        subscription={subscription}
        setSubscription={setSubscription}
        collapseSearch={collapseSearch}
      />
      <CardInspect />
      <DeckArea />
    </div>
  );
}
export default DeckBuilder;