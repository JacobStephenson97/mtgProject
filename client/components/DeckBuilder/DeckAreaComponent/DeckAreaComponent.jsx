import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import MtgCard from "../SearchComponent/Card";
import { card } from "mtgsdk";
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeckHeading from "./DeckHeadingComponent/DeckHeadingComponent";
import DeckButtons from "./DeckButtons/DeckButtons";
const useStyles = makeStyles((theme) => ({
  inputBase: {
    borderRadius: theme.shape.borderRadius,
    height: 10,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#C8C8C8",
  },
  test: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 187,
  },
  test2: {
    display: "flex",
    justifyContent: "space-between",
  },
  typeHeader: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
    margin: 0,
  },
  deckCard: {
    backgroundColor: "rgba(72,72,72,0.7)",
    padding: 10,
    height: "95%",
    width: "99%",
    overflowY: "auto",
    position: "absolute",
  },
}));

function handleValueChange(e, setSearch) {
  setSearch(e.target.value);
}

export default ({
  currentDeck,
  removeCard,
  setCurrentDeck,
  toggleGraph,
  handleCollapse,
}) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  //OPTION FOR HOVER DELAY, SET UP LATER
  const [hoverDelay, setHoverDelay] = useState(0);
  const [subDecks, setSubDecks] = useState([]);
  onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.droppableId != result.source.droppableId) return;
    const items = Array.from(subDecks);
    const [reorderedItem] = items[result.source.droppableId].splice(
      result.source.index,
      1
    );
    items[result.destination.droppableId].splice(
      result.destination.index,
      0,
      reorderedItem
    );
    setSubDecks(items);
    mergeCards();
  };
  let sortedArray = [];
  currentDeck.forEach((card) => {
    if (!sortedArray.includes(card.types[card.types.length - 1]))
      sortedArray.push(card.types[card.types.length - 1]);
  });
  sortedArray.map((type, i) => {
    sortedArray[i] = currentDeck.filter(
      (card) => card.types[card.types.length - 1] === type
    );
    let cardCount = [];
    sortedArray[i].forEach((card) => {
      if (!Object.keys(cardCount.includes(card.name))) {
        cardCount[card.name] = 1;
      } else cardCount[card.name] = (cardCount[card.name] ?? 0) + 1;
    });
    sortedArray[i] = Array.from(new Set(sortedArray[i].map((a) => a.id))).map(
      (id) => {
        return sortedArray[i].find((a) => a.id === id);
      }
    );
    sortedArray[i].forEach((card) => {
      if (Object.keys(cardCount).includes(card.name))
        card["count"] = cardCount[card.name];
    });
    sortedArray[i].unshift(type);
  });

  mergeCards = () => {
    let merged = [].concat.apply([], subDecks);
    merged = merged.filter((card) => typeof card == "object");
    merged.forEach((card) => {
      if (card.count > 1)
        for (let i = 1; i < card.count; i++) merged.push(card);
      card.count = 1;
    });
    setCurrentDeck(merged);
  };
  createNewSubDeck = (deckArray) => {
    setSubDecks((oldDecks) => [...oldDecks, deckArray]);
  };
  return (
    <div>
      <DeckButtons
        currentDeck={currentDeck}
        setCurrentDeck={setCurrentDeck}
        toggleGraph={toggleGraph}
        handleCollapse={handleCollapse}
        subDecks={subDecks}
        setSubDecks={setSubDecks}
      />
      <Card className={classes.deckCard}>
        <InputBase
          type="search"
          id="outlined-full-width"
          fullWidth
          placeholder="Search Deck..."
          variant="outlined"
          className={classes.inputBase}
          autoComplete="off"
          onChange={(e) => {
            handleValueChange(e, setSearch);
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.test2}>
            <DeckHeading
              subDecks={subDecks}
              setCurrentDeck={setCurrentDeck}
              removeCard={removeCard}
              search={search}
              hoverDelay={hoverDelay}
              currentDeck={subDecks}
            />
          </div>
        </DragDropContext>
        <button onClick={() => setSubDecks(sortedArray)}>TEST STATE</button>
        <button onClick={() => createNewSubDeck([])}>TEST STATE</button>
      </Card>
    </div>
  );
};
