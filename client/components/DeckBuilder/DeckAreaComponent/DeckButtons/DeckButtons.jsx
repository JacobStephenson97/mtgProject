import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { SaveComponent } from "../../SaveAreaComponent/SaveAreaComponent";
import { LoadComponent } from "../../LoadDeckComponent/LoadDeckComponent";
import { DeckImport } from "../../ImportDeck/ImportDeck";
const useStyles = makeStyles((theme) => ({
  deckSortButtons: {
    position: "relative",
    left: 0,
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
  deckButtons: {
    position: "absolute",
    display: "inline",
    right: 0,
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
  allButtons: {
    marginBottom: 5,
  },
}));

function sortByName(
  subDecks,
  setSubDecks,
  nameSortOrder,
  setNameSortOrder,
  setCmcSortOrder
) {
  for (let i = 0; i < subDecks.length; i++) {
    let type = subDecks[i].shift();
    if (nameSortOrder == true)
      subDecks[i].sort((a, b) => (a.name < b.name ? 1 : -1));
    else subDecks[i].sort((a, b) => (a.name > b.name ? 1 : -1));
    subDecks[i].unshift(type);
  }
  setSubDecks([...subDecks]);
  setNameSortOrder(!nameSortOrder);
  setCmcSortOrder(null);
}

function sortByCMC(
  subDecks,
  setSubDecks,
  cmcSortOrder,
  setCmcSortOrder,
  setNameSortOrder
) {
  for (let i = 0; i < subDecks.length; i++) {
    let type = subDecks[i].shift();
    if (cmcSortOrder == true)
      subDecks[i].sort((a, b) => (a.cmc > b.cmc ? 1 : -1));
    else subDecks[i].sort((a, b) => (a.cmc < b.cmc ? 1 : -1));
    subDecks[i].unshift(type);
  }
  setSubDecks([...subDecks]);
  setCmcSortOrder(!cmcSortOrder);
  setNameSortOrder(null);
}

function importDeckFinal(deck, setCurrentDeck, countObj) {
  const newDeck = [];
  deck.forEach((card) => {
    const count = countObj[card.name];
    for (let i = 0; i < count; i++) newDeck.push(card);
  });
  setCurrentDeck(newDeck);
}

export default ({
  currentDeck,
  setCurrentDeck,
  toggleGraph,
  handleCollapse,
  subDecks,
  setSubDecks,
}) => {
  const classes = useStyles();
  const [cmcSortOrder, setCmcSortOrder] = useState(null);
  const [nameSortOrder, setNameSortOrder] = useState(null);
  const [deckName, setDeckName] = React.useState("");

  return (
    <div className={classes.allButtons}>
      <div className={classes.deckSortButtons}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            className={classes.sortButtons}
            onClick={(e) =>
              sortByName(
                subDecks,
                setSubDecks,
                nameSortOrder,
                setNameSortOrder,
                setCmcSortOrder
              )
            }>
            Name{" "}
            {nameSortOrder !== null
              ? nameSortOrder == false
                ? "Z-A"
                : "A-Z"
              : ""}
          </Button>
          <Button
            className={classes.sortButtons}
            onClick={(e) =>
              sortByCMC(
                subDecks,
                setSubDecks,
                cmcSortOrder,
                setCmcSortOrder,
                setNameSortOrder
              )
            }>
            CMC{" "}
            {cmcSortOrder !== null ? (cmcSortOrder == false ? "⇧" : "⇩") : ""}
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
          />
        </ButtonGroup>
      </div>
    </div>
  );
};
