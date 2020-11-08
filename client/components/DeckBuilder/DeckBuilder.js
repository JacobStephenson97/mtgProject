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
import { DeckImport } from "./ImportDeck/ImportDeck";
import { SearchArea } from "./SearchArea/SearchArea";
import { SaveComponent } from "./SaveAreaComponent/SaveAreaComponent";
import { LoadComponent } from "./LoadDeckComponent/LoadDeckComponent";
import { Collapse } from "@material-ui/core";

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
    overflowY: "auto",
    position: "absolute",
  },
  deckSortButtons: {
    position: "relative",
    left: "1%",
    display: "inline",
  },
  sortButtons: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
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
  toggleGraphButton: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
  },
  deckButtons: {
    position: "absolute",
    display: "inline",
    right: "1%",
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
function importDeckFinal(deck, setCurrentDeck, countObj) {
  const newDeck = [];
  deck.forEach((card) => {
    const count = countObj[card.name];
    for (let i = 0; i < count; i++) newDeck.push(card);
  });
  setCurrentDeck(newDeck);
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
function sortByName(currentDeck, setCurrentDeck) {
  currentDeck.sort((a, b) => (a.name > b.name ? 1 : -1));
  setCurrentDeck([...currentDeck]);
}
function sortByCMC(currentDeck, setCurrentDeck, cmcSortOrder, setCmcSortOrder) {
  if (cmcSortOrder == true)
    currentDeck.sort((a, b) => (a.cmc > b.cmc ? 1 : -1));
  else currentDeck.sort((a, b) => (a.cmc < b.cmc ? 1 : -1));
  setCurrentDeck([...currentDeck]);
  setCmcSortOrder(!cmcSortOrder);
}
function sortByType(currentDeck, setCurrentDeck) {
  currentDeck.sort((a, b) => (a.types > b.types ? 1 : -1));
  setCurrentDeck([...currentDeck]);
}

export function DeckBuilder(props) {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [toggleGraph, setToggleGraph] = useState([false]);
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [deckName, setDeckName] = React.useState("");
  const [countObj, setCountObj] = React.useState({});
  const [collapseSearch, setCollapseSearch] = useState(false);
  const [collapseStats, setCollapseStats] = useState(true);
  const [cmcSortOrder, setCmcSortOrder] = useState(null);
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
      <div>
        <div className={classes.deckSortButtons}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group">
            <Button
              className={classes.sortButtons}
              onClick={(e) => sortByName(currentDeck, setCurrentDeck)}>
              Name
            </Button>
            <Button
              className={classes.sortButtons}
              onClick={(e) =>
                sortByCMC(
                  currentDeck,
                  setCurrentDeck,
                  cmcSortOrder,
                  setCmcSortOrder
                )
              }>
              CMC{" "}
              {cmcSortOrder !== null ? (cmcSortOrder == false ? "⇧" : "⇩") : ""}
            </Button>
            <Button
              className={classes.sortButtons}
              onClick={(e) => sortByType(currentDeck, setCurrentDeck)}>
              Type
            </Button>
            <Button
              className={classes.sortButtons}
              onClick={() => handleCollapse()}>
              Toggle Search
            </Button>
          </ButtonGroup>
        </div>
        <div className={classes.deckButtons}>
          <ButtonGroup>
            <SaveComponent
              currentDeck={currentDeck}
              deckName={deckName}
              setDeckName={setDeckName}
            />
            <LoadComponent
              setCurrentDeck={setCurrentDeck}
              deckName={deckName}
              setDeckName={setDeckName}
            />
            {toggleGraph ? (
              <Button
                className={classes.toggleGraphButton}
                variant="outlined"
                color="primary"
                onClick={() => setToggleGraph((toggleGraph) => !toggleGraph)}>
                Show Graphs
              </Button>
            ) : (
              <Button
                className={classes.toggleGraphButton}
                variant="outlined"
                color="primary"
                onClick={() => setToggleGraph((toggleGraph) => !toggleGraph)}>
                Show Stats
              </Button>
            )}
            <DeckImport
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
              importDeckFinal={importDeckFinal}
              search={search}
              setSearch={setSearch}
              countObj={countObj}
              setCountObj={setCountObj}
            />
          </ButtonGroup>
        </div>
      </div>
      <div className={classes.deckArea}>
        <Card className={classes.deckCard}>
          <DeckAreaComponent
            currentDeck={currentDeck}
            removeCard={removeCard}
            setCurrentDeck={setCurrentDeck}
          />
        </Card>
      </div>
      {!collapseStats ? (
        <Card className={classes.statsArea}>
          <StatsPanel currentDeck={currentDeck} toggleGraph={toggleGraph} />
        </Card>
      ) : null}
    </div>
  );
}
